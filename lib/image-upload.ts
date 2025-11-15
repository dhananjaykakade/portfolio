import { supabase } from './supabase'

export async function uploadImage(file: File, folder: string = 'blog'): Promise<{ url: string; path: string } | null> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName)

    return {
      url: publicUrl,
      path: fileName
    }
  } catch (error) {
    console.error('Error in uploadImage:', error)
    return null
  }
}

export async function deleteImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from('blog-images')
      .remove([path])

    if (error) {
      console.error('Error deleting image:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in deleteImage:', error)
    return false
  }
}

export async function listImages(folder: string = 'blog'): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from('blog-images')
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error) {
      console.error('Error listing images:', error)
      return []
    }

    return data.map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(`${folder}/${file.name}`)
      return publicUrl
    })
  } catch (error) {
    console.error('Error in listImages:', error)
    return []
  }
}
