import { supabase } from './supabase';


export interface Review {
  id: string
  blog_slug: string
  name: string
  email?: string
  rating: number
  comment: string
  approved: boolean
  created_at: string
}

export interface ReviewInput {
  blog_slug: string
  name: string
  email?: string
  rating: number
  comment: string
}

export async function submitReview(review: ReviewInput): Promise<{ success: boolean; error?: string }> {
 
  
  const { data, error } = await supabase
    .from('blog_reviews')
    .insert([review])
    .select()

  if (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function getBlogReviews(slug: string): Promise<Review[]> {
 
  
  const { data: reviews, error } = await supabase
    .from('blog_reviews')
    .select('*')
    .eq('blog_slug', slug)
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }

  return reviews
}

export async function getAverageRating(slug: string): Promise<number> {

  
  const { data, error } = await supabase
    .from('blog_reviews')
    .select('rating')
    .eq('blog_slug', slug)
    .eq('approved', true)

  if (error || !data || data.length === 0) {
    return 0
  }

  const average = data.reduce((sum, review) => sum + review.rating, 0) / data.length
  return Math.round(average * 10) / 10 // Round to 1 decimal place
}