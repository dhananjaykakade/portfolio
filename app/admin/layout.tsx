"use client"

import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Layout, FileText, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Admin Header */}
      <header className="bg-white border-b border-[#FF7F3E]/20 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FFF5F0] transition-all">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Site
                </Button>
              </Link>
              <div className="h-6 w-px bg-[#FF7F3E]/20" />
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#FF7F3E] to-[#FFB67B] flex items-center justify-center shadow-md">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-[#1F2937]">Admin Panel</h1>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-red-600 hover:bg-red-50 transition-all">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-[#FF7F3E]/20">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-[#1F2937]">Logout Confirmation</AlertDialogTitle>
                  <AlertDialogDescription className="text-[#4B5563]">
                    Are you sure you want to logout? You will need to login again to access the admin panel.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-[#FF7F3E]/20 hover:bg-[#FFF5F0]">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      {/* Admin Navigation */}
      <nav className="bg-white border-b border-[#FF7F3E]/10">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FFF5F0] transition-all">
                <Layout className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#FF7F3E] hover:bg-[#FFF5F0] transition-all">
                <FileText className="h-4 w-4 mr-2" />
                Blog Posts
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
