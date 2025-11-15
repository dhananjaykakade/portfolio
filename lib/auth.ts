// Authentication utility functions for admin panel

// Generate admin token with timestamp and hash
export function generateAdminToken(username: string): string {
  const timestamp = Date.now().toString()
  const secret = process.env.ADMIN_SECRET || 'change-this-in-production'
  
  // Generate hash
  const data = `${username}:${timestamp}:${secret}`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const hashStr = Math.abs(hash).toString(36)
  
  // Encode token
  const tokenData = `${username}:${timestamp}:${hashStr}`
  return Buffer.from(tokenData).toString('base64')
}

// Verify admin credentials
export function verifyAdminCredentials(username: string, password: string): boolean {
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  // Validate environment variables are set
  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables')
    return false
  }

  // Constant-time comparison to prevent timing attacks
  const usernameMatch = constantTimeCompare(username, adminUsername)
  const passwordMatch = constantTimeCompare(password, adminPassword)

  return usernameMatch && passwordMatch
}

// Constant-time string comparison to prevent timing attacks
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }

  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }

  return result === 0
}

// Rate limiting store (in-memory, use Redis in production)
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

// Check if IP is rate limited
export function checkRateLimit(ip: string): { allowed: boolean; remainingAttempts: number; resetTime?: number } {
  const maxAttempts = 5
  const windowMs = 15 * 60 * 1000 // 15 minutes

  const now = Date.now()
  const attempt = loginAttempts.get(ip)

  if (!attempt) {
    return { allowed: true, remainingAttempts: maxAttempts - 1 }
  }

  // Reset if window expired
  if (now > attempt.resetTime) {
    loginAttempts.delete(ip)
    return { allowed: true, remainingAttempts: maxAttempts - 1 }
  }

  // Check if rate limit exceeded
  if (attempt.count >= maxAttempts) {
    return { 
      allowed: false, 
      remainingAttempts: 0,
      resetTime: attempt.resetTime
    }
  }

  return { 
    allowed: true, 
    remainingAttempts: maxAttempts - attempt.count - 1 
  }
}

// Record login attempt
export function recordLoginAttempt(ip: string, success: boolean): void {
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const now = Date.now()

  const attempt = loginAttempts.get(ip)

  if (!attempt || now > attempt.resetTime) {
    loginAttempts.set(ip, {
      count: 1,
      resetTime: now + windowMs
    })
  } else {
    attempt.count++
  }

  // Clean up old entries periodically
  if (Math.random() < 0.01) { // 1% chance
    cleanupRateLimitStore()
  }

  // If login successful, reset counter
  if (success) {
    loginAttempts.delete(ip)
  }
}

// Cleanup expired rate limit entries
function cleanupRateLimitStore(): void {
  const now = Date.now()
  for (const [ip, attempt] of loginAttempts.entries()) {
    if (now > attempt.resetTime) {
      loginAttempts.delete(ip)
    }
  }
}

// Get client IP from request
export function getClientIp(request: Request): string {
  // Check common headers for real IP (when behind proxy)
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')

  if (cfConnectingIp) return cfConnectingIp
  if (realIp) return realIp
  if (forwardedFor) return forwardedFor.split(',')[0].trim()

  return 'unknown'
}

// Sanitize redirect URL to prevent open redirects
export function sanitizeRedirectUrl(url: string, baseUrl: string): string {
  try {
    const redirectUrl = new URL(url, baseUrl)
    const base = new URL(baseUrl)

    // Only allow redirects to same origin and admin paths
    if (redirectUrl.origin !== base.origin) {
      return '/admin'
    }

    if (!redirectUrl.pathname.startsWith('/admin')) {
      return '/admin'
    }

    return redirectUrl.pathname + redirectUrl.search
  } catch {
    return '/admin'
  }
}

// Validate environment variables on startup
export function validateAdminConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!process.env.ADMIN_USERNAME) {
    errors.push('ADMIN_USERNAME environment variable is not set')
  } else if (process.env.ADMIN_USERNAME.length < 3) {
    errors.push('ADMIN_USERNAME must be at least 3 characters long')
  }

  if (!process.env.ADMIN_PASSWORD) {
    errors.push('ADMIN_PASSWORD environment variable is not set')
  } else if (process.env.ADMIN_PASSWORD.length < 8) {
    errors.push('ADMIN_PASSWORD must be at least 8 characters long')
  }

  if (!process.env.ADMIN_SECRET) {
    errors.push('ADMIN_SECRET environment variable is not set (using default - INSECURE)')
  } else if (process.env.ADMIN_SECRET.length < 32) {
    errors.push('ADMIN_SECRET should be at least 32 characters long for security')
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
