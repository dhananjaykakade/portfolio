"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Review } from "@/lib/review-actions"

interface ReviewsListProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export function ReviewsList({ reviews, averageRating, totalReviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#4B5563]">No reviews yet. Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-white rounded-2xl border border-[#FF7F3E]/20 p-6 shadow-sm">
        <h3 className="text-xl font-bold text-[#1F2937] mb-4">Reader Reviews</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1F2937]">{averageRating}</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(averageRating)
                      ? "text-[#FF7F3E] fill-[#FF7F3E]"
                      : star === Math.ceil(averageRating) && averageRating % 1 > 0
                      ? "text-[#FF7F3E] fill-[#FF7F3E] opacity-50"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-[#4B5563] mt-1">{totalReviews} reviews</div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-[#FF7F3E]/10 p-6 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-[#1F2937]">{review.name}</h4>
                <time className="text-sm text-[#4B5563]">
                  {new Date(review.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? "text-[#FF7F3E] fill-[#FF7F3E]"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#4B5563] leading-relaxed">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}