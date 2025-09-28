import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Blog views tracking
export const incrementBlogView = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_views')
    .select('views')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    // Create new entry
    const { error: insertError } = await supabase
      .from('blog_views')
      .insert([{ slug, views: 1 }])
    return insertError
  } else {
    // Update existing entry
    const { error: updateError } = await supabase
      .from('blog_views')
      .update({ views: data.views + 1 })
      .eq('slug', slug)
    return updateError
  }
}

export const getBlogViews = async (slug: string): Promise<number> => {
  const { data, error } = await supabase
    .from('blog_views')
    .select('views')
    .eq('slug', slug)
    .single()

  if (error || !data) return 0
  return data.views
}