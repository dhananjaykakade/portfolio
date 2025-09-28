"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Send, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { submitReview } from "@/lib/review-actions"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  blogSlug: string
}

export function ReviewForm({ blogSlug }: ReviewFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive"
      })
      return
    }

    if (!formData.name.trim() || !formData.comment.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    const result = await submitReview({
      blog_slug: blogSlug,
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      rating,
      comment: formData.comment.trim()
    })

    if (result.success) {
      setIsSubmitted(true)
      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback!",
      })
      // Reset form
      setRating(0)
      setFormData({ name: "", email: "", comment: "" })
    } else {
      toast({
        title: "Error submitting review",
        description: result.error || "Please try again later.",
        variant: "destructive"
      })
    }

    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 bg-green-50 border border-green-200 rounded-2xl"
      >
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">Your review has been submitted successfully.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-[#FF7F3E]/20 p-6 shadow-sm"
    >
      <h3 className="text-xl font-bold text-[#1F2937] mb-4">Share Your Thoughts</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-[#4B5563] mb-2">
            Rating <span className="text-[#FF7F3E]">*</span>
          </label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1 transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? "text-[#FF7F3E] fill-[#FF7F3E]"
                      : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#4B5563] mb-2">
            Name <span className="text-[#FF7F3E]">*</span>
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="bg-white border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937]"
          />
        </div>

        {/* Email (Optional) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#4B5563] mb-2">
            Email (Optional)
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
            className="bg-white border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937]"
          />
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-[#4B5563] mb-2">
            Comment <span className="text-[#FF7F3E]">*</span>
          </label>
          <Textarea
            id="comment"
            name="comment"
            required
            rows={4}
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Share your thoughts about this article..."
            className="bg-white border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937] resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white font-semibold"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Submit Review <Send className="h-4 w-4" />
            </div>
          )}
        </Button>
      </form>
    </motion.div>
  )
}