"use server"

import { sendContactEmails } from "@/lib/email"

export async function sendContactEmail(data: {
  name: string
  email: string
  subject?: string
  message: string
}) {
  try {
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: "Name, email, and message are required",
      }
    }

    await sendContactEmails({
      name: data.name,
      email: data.email,
      subject: data.subject || "Portfolio contact",
      message: data.message,
    })

    return {
      success: true,
      message: "Message sent successfully!",
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again later.",
    }
  }
}
