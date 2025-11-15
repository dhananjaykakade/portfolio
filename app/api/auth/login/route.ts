import { NextRequest, NextResponse } from 'next/server'
import { 
  verifyAdminCredentials, 
  generateAdminToken, 
  checkRateLimit, 
  recordLoginAttempt,
  getClientIp,
  sanitizeRedirectUrl
} from '@/lib/auth'

// POST /api/auth/login - Admin login
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request)

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      const resetTime = rateLimit.resetTime || Date.now()
      const waitMinutes = Math.ceil((resetTime - Date.now()) / 60000)
      
      return NextResponse.json(
        { 
          error: 'Too many login attempts',
          message: `Please try again in ${waitMinutes} minute${waitMinutes > 1 ? 's' : ''}`,
          resetTime
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json().catch(() => null)
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { username, password, redirect } = body

    // Validate input
    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    if (!password || typeof password !== 'string' || password.length === 0) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Verify credentials
    const isValid = verifyAdminCredentials(username.trim(), password)

    // Record attempt
    recordLoginAttempt(clientIp, isValid)

    if (!isValid) {
      // Don't reveal whether username or password was wrong
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          remainingAttempts: checkRateLimit(clientIp).remainingAttempts
        },
        { status: 401 }
      )
    }

    // Generate token
    const token = generateAdminToken(username.trim())

    // Sanitize redirect URL
    const redirectUrl = redirect 
      ? sanitizeRedirectUrl(redirect, request.url)
      : '/admin'

    // Set secure cookie
    const response = NextResponse.json(
      { 
        success: true,
        message: 'Login successful',
        redirect: redirectUrl
      },
      { status: 200 }
    )

    // Set cookie with security flags
    const isProduction = process.env.NODE_ENV === 'production'
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    )
  }
}

// GET /api/auth/login - Check auth status
export async function GET(request: NextRequest) {
  const token = request.cookies.get('admin-token')?.value

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 })
  }

  // In a real implementation, verify the token
  // For now, just check if it exists
  return NextResponse.json({ authenticated: true }, { status: 200 })
}
