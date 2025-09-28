'use client'

import { useState } from 'react'
import { ZoomIn, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BlogImageProps {
  src: string
  alt: string
  caption?: string
}

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [imageError, setImageError] = useState(false)

  if (imageError) {
    return (
      <figure className="my-8">
        <div className="w-full h-48 bg-zinc-800 rounded-xl flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-zinc-600" />
        </div>
        {caption && (
          <figcaption className="text-center text-sm text-zinc-400 mt-3 px-4">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="">
      <div className="relative group rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/50">
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto transition-all duration-300 fit-cover cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          onError={() => setImageError(true)}
        />
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800/80 hover:bg-zinc-700/80 backdrop-blur-sm"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      
      {caption && (
        <figcaption className="text-center text-sm text-zinc-400 mt-3 px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}