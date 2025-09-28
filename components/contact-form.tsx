"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: data.message,
        })
        form.reset()
      } else {
        toast({
          title: "Error sending message.",
          description: data.message || "Something went wrong.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      toast({
        title: "Error sending message.",
        description: "Could not connect to the server. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#FFF5F0] border border-[#FF7F3E]/20 p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#FF7F3E]/5 to-[#3AB0FF]/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold text-[#1F2937] mb-2">Send Me a Message</h3>
          <p className="text-[#4B5563] mb-6">Let's discuss your project ideas</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937] font-medium">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name"
                        className="bg-white/80 border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937] placeholder-[#4B5563] transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF7F3E]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937] font-medium">Your Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/80 border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937] placeholder-[#4B5563] transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF7F3E]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937] font-medium">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's this about?"
                        className="bg-white/80 border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937] placeholder-[#4B5563] transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF7F3E]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#1F2937] font-medium">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about your project..."
                        rows={5}
                        className="bg-white/80 border-[#FF7F3E]/20 focus:border-[#FF7F3E] focus:ring-[#FF7F3E]/20 text-[#1F2937] placeholder-[#4B5563] resize-none transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#FF7F3E]" />
                  </FormItem>
                )}
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-[#FF7F3E] to-[#FF9F5A] hover:from-[#FF9F5A] hover:to-[#FF7F3E] text-white font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Send Message <Send className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>

          {/* Success State (optional) */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: form.formState.isSubmitSuccessful ? 1 : 0,
              height: form.formState.isSubmitSuccessful ? "auto" : 0
            }}
            className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
          >
            <p>Thank you for your message! I'll get back to you soon.</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}