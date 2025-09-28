'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  title: string
  description: string
  variant?: 'ghost' | 'default'
}

export function ShareButton({ title, description, variant = 'ghost' }: ShareButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const shareBlog = async () => {
    const shareData = {
      title,
      text: description,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback to copy
      try {
        await navigator.clipboard.writeText(window.location.href)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err) {
        console.log('Error copying:', err)
      }
    }
  }

  return (
    <Button
      variant={variant}
      size="sm"
      onClick={shareBlog}
      className={variant === 'ghost' ? 'text-zinc-400 hover:text-white' : ''}
    >
      {isCopied ? (
        <Check className="h-4 w-4 mr-2" />
      ) : (
        <Share2 className="h-4 w-4 mr-2" />
      )}
      {isCopied ? 'Copied!' : 'Share'}
    </Button>
  )
}