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
  html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Reaching Out</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #F9F9F9 0%, #FFF5F0 100%);
                margin: 0;
                padding: 20px;
                min-height: 100vh;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #FFFFFF;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 182, 123, 0.2);
            }
            
            .email-header {
                background: linear-gradient(135deg, #FF7F3E 0%, #FFB67B 100%);
                padding: 40px 30px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            
            .header-pattern {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0.1;
                background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            }
            
            .logo {
                font-size: 28px;
                font-weight: 800;
                color: #FFFFFF;
                margin-bottom: 16px;
                position: relative;
                z-index: 2;
            }
            
            .greeting {
                font-size: 32px;
                font-weight: 800;
                color: #FFFFFF;
                margin-bottom: 8px;
                position: relative;
                z-index: 2;
            }
            
            .subtitle {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.9);
                font-weight: 500;
                position: relative;
                z-index: 2;
            }
            
            .email-content {
                padding: 40px 30px;
            }
            
            .message {
                color: #1F2937;
                font-size: 16px;
                line-height: 1.7;
                margin-bottom: 24px;
            }
            
            .highlight {
                color: #FF7F3E;
                font-weight: 600;
            }
            
            .response-time {
                background: #FFF5F0;
                border: 1px solid rgba(255, 182, 123, 0.3);
                border-radius: 16px;
                padding: 20px;
                margin: 30px 0;
                text-align: center;
            }
            
            .response-time-icon {
                font-size: 24px;
                margin-bottom: 8px;
            }
            
            .response-time-text {
                color: #4B5563;
                font-size: 14px;
                font-weight: 500;
            }
            
            .contact-info {
                background: #F9F9F9;
                border-radius: 16px;
                padding: 24px;
                margin: 30px 0;
            }
            
            .contact-title {
                color: #1F2937;
                font-size: 18px;
                font-weight: 700;
                margin-bottom: 16px;
                text-align: center;
            }
            
            .contact-details {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .contact-item {
                display: flex;
                align-items: center;
                gap: 12px;
                color: #4B5563;
                font-size: 14px;
            }
            
            .contact-icon {
                color: #FF7F3E;
                font-weight: bold;
            }
            
            .cta-section {
                text-align: center;
                margin: 30px 0;
            }
            
            .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #FF7F3E 0%, #FFB67B 100%);
                color: #FFFFFF;
                padding: 14px 32px;
                border-radius: 50px;
                text-decoration: none;
                font-weight: 700;
                font-size: 15px;
                transition: all 0.3s ease;
                box-shadow: 0 8px 25px rgba(255, 127, 62, 0.3);
            }
            
            .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 35px rgba(255, 127, 62, 0.4);
            }
            
            .email-footer {
                background: #F9F9F9;
                padding: 30px;
                text-align: center;
                border-top: 1px solid rgba(255, 182, 123, 0.2);
            }
            
            .footer-text {
                color: #4B5563;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .social-links {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .social-link {
                color: #FF7F3E;
                text-decoration: none;
                font-weight: 600;
                font-size: 14px;
                transition: color 0.3s ease;
            }
            
            .social-link:hover {
                color: #FFB67B;
            }
            
            .copyright {
                color: #9CA3AF;
                font-size: 12px;
                margin-top: 20px;
            }
            
            @media (max-width: 600px) {
                body {
                    padding: 10px;
                }
                
                .email-header {
                    padding: 30px 20px;
                }
                
                .email-content {
                    padding: 30px 20px;
                }
                
                .greeting {
                    font-size: 28px;
                }
                
                .contact-details {
                    flex-direction: column;
                }
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header -->
            <div class="email-header">
                <div class="header-pattern"></div>
                <div class="logo">Dhananjay Kakade</div>
                <h1 class="greeting">Hello ${name}! 👋</h1>
                <p class="subtitle">Thank you for reaching out</p>
            </div>
            
            <!-- Content -->
            <div class="email-content">
                <p class="message">
                    I've received your message and wanted to personally thank you for getting in touch. 
                    I'm excited to learn more about your project and how we can work together to bring your ideas to life.
                </p>
                
                <p class="message">
                    I typically respond to all inquiries within <span class="highlight">24 hours</span>. 
                    In the meantime, feel free to explore my portfolio for more examples of my work.
                </p>
                
                <!-- Response Time -->
                <div class="response-time">
                    <div class="response-time-icon">⏰</div>
                    <div class="response-time-text">
                        <strong>Response Time:</strong> Within 24 hours<br>
                        <small>I value your time and will get back to you promptly</small>
                    </div>
                </div>
                
                <!-- Contact Info -->
                <div class="contact-info">
                    <h3 class="contact-title">Quick Contact Info</h3>
                    <div class="contact-details">
                        <div class="contact-item">
                            <span class="contact-icon">📧</span>
                            <span>kakadedhananjay59@gmail.com</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">📱</span>
                            <span>+91 95529 35559</span>
                        </div>
                        <div class="contact-item">
                            <span class="contact-icon">🌐</span>
                            <span>https://dhananjaykakade.tech</span>
                        </div>
                    </div>
                </div>
                
                <!-- CTA -->
                <div class="cta-section">
                    <a href="YOUR_PORTFOLIO_URL" class="cta-button">
                        Visit My Portfolio 🚀
                    </a>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="email-footer">
                <p class="footer-text">
                    Looking forward to our conversation!<br>
                    Let's create something amazing together.
                </p>
                
                <div class="social-links">
                    <a href="https://www.linkedin.com/in/dhananjay-kakade-657087294/" class="social-link">LinkedIn</a>
                    <a href="https://github.com/dhananjaykakade" class="social-link">GitHub</a>
                    <a href="https://x.com/Dhananjay0980" class="social-link">Twitter</a>
                </div>
                
                <p class="copyright">
                    &copy; 2024 Dhananjay Kakade. All rights reserved.<br>
                    Pune, India
                </p>
            </div>
        </div>
    </body>
    </html>
  `,
})



    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 })
  }
}
