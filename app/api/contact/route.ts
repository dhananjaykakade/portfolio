import { NextResponse } from "next/server"

import { sendContactEmails } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    await sendContactEmails({ name, email, subject, message })

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
