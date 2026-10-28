import { NextResponse } from "next/server"
import { z } from "zod"

import { sendContactEmails } from "@/lib/email"

export const runtime = "nodejs"

const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(1),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    await sendContactEmails(result.data)

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
