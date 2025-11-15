"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentBlockEditor } from '@/components/content-block-editor'
import { ContentBlock } from '@/lib/blog-data'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'

export default function NewBlogPost() {
  const router = useRouter()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    excerpt: '',
    category: '',
    tags: '',
    readTime: 5,
    image: {
      url: '',
      alt: '',
      caption: ''
    },
    published: false
  })
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([])

  const generateSlug = (title: string) => {
    if (!title || title.trim() === '') return ''
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for your blog post.",
        variant: "destructive"
      })
      return
    }
    
    if (!formData.slug.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a URL slug for your blog post.",
        variant: "destructive"
      })
      return
    }
    
    if (contentBlocks.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one content block to your blog post.",
        variant: "destructive"
      })
      return
    }

    setSaving(true)

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        contentBlocks,
        // Generate markdown content from blocks for backward compatibility
        content: generateMarkdownFromBlocks(contentBlocks),
      }
      
      console.log('Submitting blog post:', payload)

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success!",
          description: `Blog post "${formData.title}" has been ${formData.published ? 'published' : 'saved as draft'} successfully.`,
        })
        router.push('/admin/blog')
        router.refresh()
      } else {
        // Handle specific error cases
        if (response.status === 400 && data.error?.includes('Slug already exists')) {
          toast({
            title: "Duplicate Slug",
            description: "A blog post with this URL slug already exists. Please use a different slug.",
            variant: "destructive"
          })
        } else {
          toast({
            title: "Error Creating Post",
            description: data.error || "Failed to create blog post. Please check your input and try again.",
            variant: "destructive"
          })
        }
        console.error('Error response:', data)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      toast({
        title: "Network Error",
        description: "Failed to connect to the server. Please check your connection and try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const generateMarkdownFromBlocks = (blocks: ContentBlock[]): string => {
    return blocks.map(block => {
      switch (block.type) {
        case 'paragraph':
          return block.content
        case 'heading':
          return '#'.repeat(block.level) + ' ' + block.content
        case 'image':
          return `![${block.alt}](${block.url})`
        case 'code':
          return `\`\`\`${block.language}\n${block.code}\n\`\`\``
        case 'quote':
          return `> ${block.content}`
        case 'list':
          return block.items.map((item, idx) => 
            block.ordered ? `${idx + 1}. ${item}` : `- ${item}`
          ).join('\n')
        default:
          return ''
      }
    }).join('\n\n')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-[#1F2937]">Create New Blog Post</h1>
            <p className="text-[#4B5563] mt-1">Write and publish a new blog post</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={formData.slug ? `/blog/${formData.slug}` : '#'} target="_blank">
            <Button
              variant="outline"
              className="border-[#FF7F3E]/20"
              disabled={!formData.slug}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={saving || !formData.title || !formData.slug}
            className="bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        {/* Basic Information */}
        <Card className="border-[#FF7F3E]/20">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog post title..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => {
                  const sanitizedSlug = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9-]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '')
                  setFormData({ ...formData, slug: sanitizedSlug })
                }}
                placeholder="url-friendly-slug"
                required
              />
              <p className="text-sm text-[#4B5563]">
                URL: /blog/{formData.slug || 'your-slug'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the blog post..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Short excerpt for preview cards..."
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="e.g., Frontend, Backend"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time (minutes)</Label>
                <Input
                  id="readTime"
                  type="number"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: parseInt(e.target.value) })}
                  min="1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="React, TypeScript, Web Development"
              />
            </div>
          </CardContent>
        </Card>

        {/* Featured Image */}
        <Card className="border-[#FF7F3E]/20">
          <CardHeader>
            <CardTitle>Featured Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.image.url}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  image: { ...formData.image, url: e.target.value }
                })}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageAlt">Alt Text</Label>
              <Input
                id="imageAlt"
                value={formData.image.alt}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  image: { ...formData.image, alt: e.target.value }
                })}
                placeholder="Image description"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageCaption">Caption (Optional)</Label>
              <Input
                id="imageCaption"
                value={formData.image.caption}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  image: { ...formData.image, caption: e.target.value }
                })}
                placeholder="Image caption"
              />
            </div>

            {formData.image.url && (
              <div className="mt-4">
                <img 
                  src={formData.image.url} 
                  alt={formData.image.alt} 
                  className="max-w-full h-auto rounded-lg border border-[#FF7F3E]/20"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Blocks */}
        <Card className="border-[#FF7F3E]/20 overflow-visible">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="overflow-visible">
            <ContentBlockEditor blocks={contentBlocks} onChange={setContentBlocks} />
          </CardContent>
        </Card>

        {/* Publishing Options */}
        <Card className="border-[#FF7F3E]/20">
          <CardHeader>
            <CardTitle>Publishing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="published">Publish Status</Label>
                <p className="text-sm text-[#4B5563]">
                  {formData.published ? 'Post will be visible to everyone' : 'Post will be saved as draft'}
                </p>
              </div>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={saving || !formData.title || !formData.slug}
            className="bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Post'}
          </Button>
        </div>
      </form>
    </div>
  )
}
