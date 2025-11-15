import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Verify admin token
function verifyAdminToken(token: string): boolean {
  try {
    // Decode base64 token
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(':')
    
    if (parts.length !== 3) {
      return false
    }

    const [username, timestamp, hash] = parts
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    
    if (tokenAge > maxAge || tokenAge < 0) {
      return false
    }

    // Verify hash
    const secret = process.env.ADMIN_SECRET || 'change-this-in-production'
    const data = `${username}:${timestamp}:${secret}`
    
    let expectedHash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      expectedHash = ((expectedHash << 5) - expectedHash) + char
      expectedHash = expectedHash & expectedHash
    }
    const expectedHashStr = Math.abs(expectedHash).toString(36)
    
    return hash === expectedHashStr
  } catch (error) {
    console.error('Token verification error:', error)
    return false
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin-token')?.value
    const isValid = token ? verifyAdminToken(token) : false

    // If on login page and already authenticated, redirect to admin dashboard
    if (pathname === '/admin/login') {
      if (isValid) {
        const redirectParam = request.nextUrl.searchParams.get('redirect')
        const adminUrl = new URL(redirectParam || '/admin', request.url)
        return NextResponse.redirect(adminUrl)
      }
      // Not authenticated, allow access to login page
      return NextResponse.next()
    }

    // For all other admin routes, check authentication
    // No token found - redirect to login
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Verify token
    if (!isValid) {
      // Invalid token - clear cookie and redirect to login
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      loginUrl.searchParams.set('expired', 'true')
      
      const response = NextResponse.redirect(loginUrl)
      response.cookies.set('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
      })
      
      return response
    }
  }

  // Allow all other routes
  return NextResponse.next()
}

// Configure which routes should run the middleware
export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
