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
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-red-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-white/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        className="bg-zinc-900/50 border-zinc-700 focus:border-red-500 focus:ring-red-500/20 text-zinc-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        className="bg-zinc-900/50 border-zinc-700 focus:border-red-500 focus:ring-red-500/20 text-zinc-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject"
                        className="bg-zinc-900/50 border-zinc-700 focus:border-red-500 focus:ring-red-500/20 text-zinc-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your Message"
                        rows={5}
                        className="bg-zinc-900/50 border-zinc-700 focus:border-red-500 focus:ring-red-500/20 text-zinc-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 border-0" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  )
}
