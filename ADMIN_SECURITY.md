# Admin Panel Security Documentation

## Overview
The admin panel is fully protected with authentication middleware, rate limiting, and secure session management.

## Security Features

### 1. **Middleware Protection** (`middleware.ts`)
- ✅ All `/admin/*` routes are protected except `/admin/login`
- ✅ Automatic redirect to login page for unauthenticated users
- ✅ Token verification on every request
- ✅ Expired tokens are automatically cleared
- ✅ Authenticated users are redirected away from login page

### 2. **Rate Limiting**
- ✅ Maximum 5 failed login attempts per IP
- ✅ 15-minute lockout window after exceeding limit
- ✅ Automatic cleanup of old rate limit entries
- ✅ Success resets the attempt counter

### 3. **Secure Authentication**
- ✅ Constant-time password comparison (prevents timing attacks)
- ✅ httpOnly cookies (prevents XSS attacks)
- ✅ Secure cookies in production
- ✅ SameSite protection (prevents CSRF)
- ✅ 24-hour token expiration
- ✅ Token verification with timestamp and hash

### 4. **Additional Security Measures**
- ✅ Input validation and sanitization
- ✅ Redirect URL sanitization (prevents open redirects)
- ✅ Environment variable validation
- ✅ IP-based rate limiting
- ✅ Error messages don't reveal username/password validity

## Required Environment Variables

Create a `.env.local` file with the following variables:

```env
# Admin Credentials (REQUIRED)
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_secure_password_min_8_chars

# Secret for token generation (REQUIRED - must be 32+ characters)
ADMIN_SECRET=your_very_long_random_secret_key_at_least_32_characters
```

### Security Recommendations:
- Use a strong password (min 8 characters, mix of letters, numbers, symbols)
- Generate a cryptographically random secret (32+ characters)
- Never commit `.env.local` to version control
- Use different credentials for different environments

## How It Works

### Authentication Flow

1. **Login Attempt**
   - User submits credentials at `/admin/login`
   - Rate limiting check (5 attempts per 15 min)
   - Credentials verified with constant-time comparison
   - If valid: token generated and stored in httpOnly cookie
   - If invalid: attempt recorded, error message shown

2. **Protected Route Access**
   - Middleware intercepts all `/admin/*` requests
   - Checks for `admin-token` cookie
   - Verifies token validity and expiration
   - If valid: request proceeds
   - If invalid/expired: redirects to login with return URL

3. **Token Verification**
   - Decodes base64 token
   - Checks expiration (24 hours)
   - Verifies hash using secret
   - Returns true/false

4. **Logout**
   - Clears admin-token cookie
   - Redirects to login page

## Testing Security

### Manual Tests

1. **Unauthenticated Access**
   ```
   Try accessing: http://localhost:3000/admin
   Expected: Redirect to /admin/login
   ```

2. **Login Page (Already Authenticated)**
   ```
   Login first, then try: http://localhost:3000/admin/login
   Expected: Redirect to /admin
   ```

3. **Rate Limiting**
   ```
   Try 6 failed login attempts
   Expected: "Too many attempts" message after 5th attempt
   ```

4. **Token Expiration**
   ```
   Wait 24 hours after login
   Expected: Redirect to login with "session expired" message
   ```

5. **Invalid Token**
   ```
   Manually modify admin-token cookie
   Expected: Redirect to login, cookie cleared
   ```

## Production Deployment Checklist

- [ ] Set strong `ADMIN_USERNAME` in production
- [ ] Set strong `ADMIN_PASSWORD` (min 8 chars)
- [ ] Set random `ADMIN_SECRET` (32+ chars)
- [ ] Ensure `NODE_ENV=production` for secure cookies
- [ ] Use HTTPS in production
- [ ] Consider implementing 2FA for additional security
- [ ] Monitor failed login attempts
- [ ] Consider using Redis for rate limiting in production
- [ ] Set up logging for security events

## API Endpoints

### POST `/api/auth/login`
Login with credentials
```json
{
  "username": "admin",
  "password": "password123",
  "redirect": "/admin/blog" // optional
}
```

### GET `/api/auth/login`
Check authentication status
```json
{
  "authenticated": true
}
```

### POST `/api/auth/logout`
Logout and clear session
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Security Headers (Recommended)

Add these to `next.config.mjs` for enhanced security:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

## Troubleshooting

### Can't access admin panel
1. Check if `.env.local` exists with correct credentials
2. Verify middleware is running (check console)
3. Clear cookies and try again
4. Check browser console for errors

### Rate limited
1. Wait 15 minutes
2. Or restart development server to clear in-memory rate limits
3. In production, consider Redis for persistent rate limiting

### Token expired message
1. This is normal after 24 hours
2. Just login again
3. Token lifetime can be adjusted in `/api/auth/login/route.ts`

## Future Improvements

- [ ] Implement 2FA (Two-Factor Authentication)
- [ ] Add session management (view/revoke active sessions)
- [ ] Implement Redis for distributed rate limiting
- [ ] Add audit logging for admin actions
- [ ] Email notifications for suspicious activity
- [ ] IP whitelist for admin access
- [ ] Password strength requirements
- [ ] Password reset functionality
- [ ] Session persistence across server restarts

## Contact

For security concerns or vulnerabilities, please contact the administrator immediately.
