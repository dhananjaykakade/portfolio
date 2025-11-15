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
    <figure className="my-4 md:my-8">
      <div className="relative group rounded-lg md:rounded-xl overflow-hidden border border-[#FF7F3E]/20 bg-white shadow-sm">
        <img
          src={src}
          alt={alt}
          className={`w-full h-auto max-h-[400px] md:max-h-[600px] object-contain transition-all duration-300 cursor-zoom-in ${
            isZoomed ? 'scale-150' : 'group-hover:scale-105'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          onError={() => setImageError(true)}
        />
        
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1F2937]/80 hover:bg-[#1F2937]/90 backdrop-blur-sm text-white"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <ZoomIn className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>
      
      {caption && (
        <figcaption className="text-center text-xs md:text-sm text-[#4B5563] mt-2 md:mt-3 px-2 md:px-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}