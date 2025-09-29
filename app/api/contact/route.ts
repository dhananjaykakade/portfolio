import { NextResponse } from "next/server"

import { qstash } from "@/lib/qstash"

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }


const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/emailWorker"
    : `${process.env.APP_URL}/api/emailWorker`;

await qstash.publishJSON({
  url,
  body: { name, email, subject, message },
});


    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
