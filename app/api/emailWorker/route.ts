import { NextResponse } from "next/server"
import nodemailer from "nodemailer"


export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json()

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 })
    }

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // e.g., 'smtp.gmail.com' or 'smtp.mailgun.org'
      port: Number.parseInt(process.env.EMAIL_PORT || "587"), // e.g., 587 for TLS, 465 for SSL
      secure: process.env.EMAIL_SECURE === "true", // Use 'true' if port is 465, 'false' for 587
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // Recipient address (can be your own email)
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)
    // Send acknowledgment email to the user
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Thank you for contacting me! 🚀",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Reaching Out</title>
</head>
<body style="margin: 0; padding: 20px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #F9F9F9 0%, #FFF5F0 100%); min-height: 100vh;">
    <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1); border: 1px solid rgba(255, 182, 123, 0.2);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #FF7F3E 0%, #FFB67B 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background: url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            <div style="font-size: 28px; font-weight: 800; color: #FFFFFF; margin-bottom: 16px; position: relative; z-index: 2;">Dhananjay Kakade</div>
            <h1 style="font-size: 32px; font-weight: 800; color: #FFFFFF; margin-bottom: 8px; position: relative; z-index: 2;">Hello ${name}! 👋</h1>
            <p style="font-size: 16px; color: rgba(255, 255, 255, 0.9); font-weight: 500; position: relative; z-index: 2;">Thank you for reaching out</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="color: #1F2937; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
                I've received your message and wanted to personally thank you for getting in touch. 
                I'm excited to learn more about your project and how we can work together to bring your ideas to life.
            </p>
            
            <p style="color: #1F2937; font-size: 16px; line-height: 1.7; margin-bottom: 24px;">
                I typically respond to all inquiries within <span style="color: #FF7F3E; font-weight: 600;">24 hours</span>. 
                In the meantime, feel free to explore my portfolio for more examples of my work.
            </p>
            
            <!-- Response Time -->
            <div style="background: #FFF5F0; border: 1px solid rgba(255, 182, 123, 0.3); border-radius: 16px; padding: 20px; margin: 30px 0; text-align: center;">
                <div style="font-size: 24px; margin-bottom: 8px;">⏰</div>
                <div style="color: #4B5563; font-size: 14px; font-weight: 500;">
                    <strong>Response Time:</strong> Within 24 hours<br>
                    <small>I value your time and will get back to you promptly</small>
                </div>
            </div>
            

            <!-- CTA -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://dhananjaykakade.tech" style="display: inline-block; background: linear-gradient(135deg, #FF7F3E 0%, #FFB67B 100%); color: #FFFFFF; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 15px; transition: all 0.3s ease; box-shadow: 0 8px 25px rgba(255, 127, 62, 0.3);">
                    Visit My Portfolio 🚀
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #F9F9F9; padding: 30px; text-align: center; border-top: 1px solid rgba(255, 182, 123, 0.2);">
            <p style="color: #4B5563; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
                Looking forward to our conversation!<br>
                Let's create something amazing together.
            </p>
            
            <div style="display: flex; justify-content: center; gap: 10%; margin-bottom: 2%;">
                <a href="https://www.linkedin.com/in/dhananjay-kakade-657087294/" style="color: #FF7F3E; text-decoration: none; font-weight: 600; font-size: 14px; transition: color 0.3s ease;">LinkedIn</a>
                <a href="https://github.com/dhananjaykakade" style="color: #FF7F3E; text-decoration: none; font-weight: 600; font-size: 14px; transition: color 0.3s ease;">GitHub</a>
                <a href="https://x.com/Dhananjay0980" style="color: #FF7F3E; text-decoration: none; font-weight: 600; font-size: 14px; transition: color 0.3s ease;">Twitter</a>
            </div>
            
            <p style="color: #9CA3AF; font-size: 12px; margin-top: 20px;">
                &copy; 2024 Dhananjay Kakade. All rights reserved.<br>
                Pune, India
            </p>
        </div>
    </div>
</body>
</html>
`
})



    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
