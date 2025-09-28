import { supabase } from './supabase'
import { BlogPost } from '@/lib/blog-data'

export async function getBlogPost(slug: string): Promise<BlogPost | null> {

  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
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
    excerpt: post.excerpt
  }
}

export async function incrementBlogView(slug: string) {

  
  const { data: currentPost } = await supabase
    .from('blog_posts')
    .select('views')
    .eq('slug', slug)
    .single()

  if (currentPost) {
    await supabase
      .from('blog_posts')
      .update({ views: (currentPost.views || 0) + 1 })
      .eq('slug', slug)
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
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
    excerpt: post.excerpt
  }))
}