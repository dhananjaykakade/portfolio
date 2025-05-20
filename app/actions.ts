"use server"

import nodemailer from "nodemailer"

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Validate input
    if (!data.name || !data.email || !data.message) {
      return {
        success: false,
        message: "Name, email, and message are required",
      }
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || "smtp.gmail.com",
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || data.email,
      to: process.env.EMAIL_TO || "dhananjay.kakade@example.com",
      subject: `Portfolio Contact: Message from ${data.name}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        
        Message:
        ${data.message}
      `,
      html: `
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

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
