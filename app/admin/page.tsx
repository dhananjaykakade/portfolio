"use client"

import { motion } from 'framer-motion'
import { FileText, Eye, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Dashboard</h1>
          <p className="text-[#4B5563] mt-1">Welcome to your admin panel</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-[#FF7F3E]/20 bg-[#FFF5F0] hover:shadow-lg hover:border-[#FF7F3E]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#4B5563]">Total Posts</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF7F3E] to-[#FFB67B] flex items-center justify-center shadow-sm">
                <FileText className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1F2937]">0</div>
              <p className="text-xs text-[#4B5563] mt-1">All blog posts</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-[#3AB0FF]/20 bg-[#F0F9FF] hover:shadow-lg hover:border-[#3AB0FF]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#4B5563]">Total Views</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3AB0FF] to-[#0077B5] flex items-center justify-center shadow-sm">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1F2937]">0</div>
              <p className="text-xs text-[#4B5563] mt-1">Across all posts</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="border-[#10B981]/20 bg-[#F0FDF4] hover:shadow-lg hover:border-[#10B981]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#4B5563]">Published</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center shadow-sm">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1F2937]">0</div>
              <p className="text-xs text-[#4B5563] mt-1">Live posts</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="border-[#FFB67B]/20 bg-[#FFFBF5] hover:shadow-lg hover:border-[#FFB67B]/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-[#4B5563]">Drafts</CardTitle>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFB67B] to-[#FF9F5A] flex items-center justify-center shadow-sm">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1F2937]">0</div>
              <p className="text-xs text-[#4B5563] mt-1">Unpublished posts</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <Card className="border-[#FF7F3E]/20 bg-white">
        <CardHeader>
          <CardTitle className="text-[#1F2937]">Quick Actions</CardTitle>
          <CardDescription className="text-[#4B5563]">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Link href="/admin/blog/new">
            <Button className="bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] hover:from-[#FFB67B] hover:to-[#FF7F3E] text-white shadow-md hover:shadow-lg transition-all">
              Create New Post
            </Button>
          </Link>
          <Link href="/admin/blog">
            <Button variant="outline" className="border-[#FF7F3E]/30 text-[#FF7F3E] hover:bg-[#FFF5F0] hover:border-[#FF7F3E] transition-all">
              Manage Posts
            </Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" className="border-[#FF7F3E]/20 text-[#4B5563] hover:bg-[#FFF5F0] hover:border-[#FF7F3E]/30 transition-all">
              View Blog
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
