"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAllBlogPosts } from '@/lib/blog-actions'
import { BlogPost } from '@/lib/blog-data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const allPosts = await getAllBlogPosts()
      setPosts(allPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== id))
        setDeleteDialogOpen(false)
        setPostToDelete(null)
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-[#4B5563]">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Blog Posts</h1>
          <p className="text-[#4B5563] mt-1">Manage all your blog posts</p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] hover:from-[#FFB67B] hover:to-[#FF7F3E] text-white shadow-md hover:shadow-lg transition-all">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card className="border-[#FF7F3E]/20 bg-white">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF5F0] flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-[#FF7F3E]" />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937] mb-2">No blog posts yet</h3>
            <p className="text-[#4B5563] mb-4">Get started by creating your first blog post</p>
            <Link href="/admin/blog/new">
              <Button className="bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] hover:from-[#FFB67B] hover:to-[#FF7F3E] text-white shadow-md hover:shadow-lg transition-all">
                Create First Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="border-[#FF7F3E]/20 bg-white hover:shadow-lg hover:border-[#FF7F3E]/40 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-[#FF7F3E] border-[#FF7F3E]/30 bg-[#FFF5F0]">
                          {post.category}
                        </Badge>
                        {post.published === false && (
                          <Badge variant="secondary" className="bg-[#FFB67B]/20 text-[#FF7F3E] border-[#FFB67B]/30">Draft</Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl text-[#1F2937] mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-[#4B5563]">{post.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.views} views
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="h-4 w-4" />
                        {post.tags.length} tags
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FFF5F0] transition-all">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FFF5F0] transition-all">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                        onClick={() => {
                          setPostToDelete(post.id)
                          setDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="border-[#FF7F3E]/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#1F2937]">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#4B5563]">
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#FF7F3E]/20 hover:bg-[#FFF5F0]">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => postToDelete && handleDelete(postToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
