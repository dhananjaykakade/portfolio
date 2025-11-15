"use client"

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImage } from '@/lib/image-upload'
import { Card, CardContent } from '@/components/ui/card'

interface ImageUploadProps {
  onImageUploaded: (url: string) => void
  currentImageUrl?: string
  label?: string
}

export function ImageUpload({ onImageUploaded, currentImageUrl, label = 'Upload Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase
      const result = await uploadImage(file)
      
      if (result) {
        onImageUploaded(result.url)
        setPreview(result.url)
      } else {
        setError('Failed to upload image')
        setPreview(null)
      }
    } catch (error) {
      console.error('Upload error:', error)
      setError('Failed to upload image')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageUploaded('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {!preview ? (
        <Card className="border-2 border-dashed border-[#FF7F3E]/30 hover:border-[#FF7F3E]/50 transition-colors">
          <CardContent className="pt-6">
            <div 
              className="flex flex-col items-center justify-center py-8 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 rounded-full bg-[#FF7F3E]/10 flex items-center justify-center mb-4">
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-[#FF7F3E] animate-spin" />
                ) : (
                  <Upload className="h-8 w-8 text-[#FF7F3E]" />
                )}
              </div>
              <p className="text-[#1F2937] font-medium mb-1">
                {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-sm text-[#4B5563]">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#FF7F3E]/20">
          <CardContent className="pt-6">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-auto rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Image
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <p className="text-sm text-red-500 mt-2">{error}</p>
      )}
    </div>
  )
}
