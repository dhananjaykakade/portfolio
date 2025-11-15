"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, User, AlertCircle, Loader2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null)

  const redirect = searchParams.get('redirect') || '/admin'
  const expired = searchParams.get('expired') === 'true'

  useEffect(() => {
    // Show session expired message
    if (expired) {
      setError('Your session has expired. Please login again.')
    }
    
    // Check if already authenticated
    checkAuth()
  }, [expired])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/login')
      const data = await response.json()
      
      if (data.authenticated) {
        router.push(redirect)
      }
    } catch (error) {
      // Not authenticated, stay on login page
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
          redirect,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Successful login
        router.push(data.redirect || '/admin')
        router.refresh()
      } else {
        // Login failed
        setError(data.error || 'Login failed')
        
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts)
        }

        if (response.status === 429) {
          setError(data.message || 'Too many login attempts. Please try again later.')
        }

        // Clear password on failed attempt
        setPassword('')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-[#FF7F3E] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#3AB0FF] rounded-full mix-blend-multiply filter blur-3xl opacity-10"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="border-[#FF7F3E]/20 shadow-2xl bg-white">
          <CardHeader className="space-y-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF7F3E] to-[#FFB67B] flex items-center justify-center shadow-lg"
            >
              <Shield className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold text-[#1F2937]">Admin Login</CardTitle>
              <CardDescription className="text-[#4B5563] mt-2">
                Enter your credentials to access the admin panel
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                  {remainingAttempts !== null && remainingAttempts > 0 && (
                    <AlertDescription className="mt-1 text-sm">
                      {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
                    </AlertDescription>
                  )}
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#1F2937] font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="pl-10 border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 transition-all"
                    required
                    disabled={loading}
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#1F2937] font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 transition-all"
                    required
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !username.trim() || !password}
                className="w-full bg-gradient-to-r from-[#FF7F3E] to-[#FFB67B] hover:from-[#FFB67B] hover:to-[#FF7F3E] text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-[#FF7F3E]/20">
              <p className="text-sm text-[#4B5563] text-center">
                Protected by rate limiting and secure authentication
              </p>
            </div>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-[#4B5563] mt-6"
        >
          Need help? Contact the administrator
        </motion.p>
      </motion.div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FF7F3E]" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
