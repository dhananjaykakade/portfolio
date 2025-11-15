import { supabase, supabaseAdmin } from './supabase'
import { BlogPost } from '@/lib/blog-data'

export async function getBlogPost(slug: string): Promise<BlogPost | null> {

  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  // Transform the database data to match your interface
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    contentBlocks: post.content_blocks,
    image: post.image ? {
      url: post.image.url,
      alt: post.image.alt,
      caption: post.image.caption
    } : undefined,
    date: post.created_at,
    readTime: post.read_time,
    tags: post.tags || [],
    views: post.views || 0,
    category: post.category,
    excerpt: post.excerpt,
    published: post.published,
    author: post.author,
    updated_at: post.updated_at
  }
}

export async function incrementBlogView(slug: string) {
  // Use admin client to bypass RLS for updating views
  const { data: currentPost } = await supabaseAdmin
    .from('blog_posts')
    .select('views')
    .eq('slug', slug)
    .single()

  if (currentPost) {
    const { error } = await supabaseAdmin
      .from('blog_posts')
      .update({ views: (currentPost.views || 0) + 1 })
      .eq('slug', slug)
    
    if (error) {
      console.error('Error incrementing view count:', error)
    }
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }

  // Transform the data to match your interface
  return posts.map(post => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    contentBlocks: post.content_blocks,
    image: post.image ? {
      url: post.image.url,
      alt: post.image.alt,
      caption: post.image.caption
    } : undefined,
    date: post.created_at,
    readTime: post.read_time,
    tags: post.tags || [],
    views: post.views || 0,
    category: post.category,
    excerpt: post.excerpt,
    published: post.published,
    author: post.author,
    updated_at: post.updated_at
  }))
}