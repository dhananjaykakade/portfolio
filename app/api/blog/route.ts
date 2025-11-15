import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET all blog posts (admin view - includes drafts)
export async function GET(request: NextRequest) {
  try {
    const { data: posts, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Received blog post data:', {
      title: body.title,
      slug: body.slug,
      hasContentBlocks: !!body.contentBlocks,
      contentBlocksLength: body.contentBlocks?.length,
      tags: body.tags,
    })
    
    const {
      title,
      slug,
      description,
      excerpt,
      category,
      content,
      contentBlocks,
      image,
      tags,
      readTime,
      published
    } = body

    // Validation
    if (!title || !slug || !content) {
      console.error('Validation failed:', { title: !!title, slug: !!slug, content: !!content })
      return NextResponse.json({ 
        error: 'Missing required fields: title, slug, and content are required' 
      }, { status: 400 })
    }

    // Check if slug already exists
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('blog_posts')
      .select('slug')
      .eq('slug', slug)
      .maybeSingle()

    if (checkError) {
      console.error('Error checking existing slug:', checkError)
      return NextResponse.json({ 
        error: 'Database error while checking slug: ' + checkError.message 
      }, { status: 500 })
    }

    if (existing) {
      console.log('Slug already exists:', slug)
      return NextResponse.json({ error: 'Slug already exists' }, { status: 400 })
    }

    const postData = {
      title,
      slug,
      description: description || null,
      excerpt: excerpt || null,
      category: category || 'Uncategorized',
      content,
      content_blocks: contentBlocks || null,
      image: image || null,
      tags: tags || [],
      read_time: readTime || 5,
      published: published || false,
      published_at: published ? new Date().toISOString() : null,
    }

    console.log('Inserting post data:', postData)

    const { data: post, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ 
        error: 'Database error: ' + error.message,
        details: error.details,
        hint: error.hint
      }, { status: 500 })
    }

    console.log('Post created successfully:', post.id)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Failed to create post: ' + errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
