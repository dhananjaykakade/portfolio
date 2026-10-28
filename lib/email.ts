import { Resend } from "resend"

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function getEmailConfig() {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, EMAIL_TO } = process.env

  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !EMAIL_TO) {
    throw new Error("Missing required Resend email configuration")
  }

  return { RESEND_API_KEY, RESEND_FROM_EMAIL, EMAIL_TO }
}

export async function sendContactEmails({ name, email, subject, message }: ContactFormData) {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, EMAIL_TO } = getEmailConfig()
  const resend = new Resend(RESEND_API_KEY)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />")

  const notification = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: [EMAIL_TO],
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Subject:</strong> ${safeSubject}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `,
  })

  if (notification.error) {
    throw new Error(`Resend notification failed: ${notification.error.message}`)
  }

  const confirmation = await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: [email],
    subject: "Thank you for contacting me!",
    text: `Hi ${name},\n\nThank you for reaching out. I've received your message and will get back to you within 24 hours.\n\nBest,\nDhananjay Kakade`,
    html: `
      <h2>Hello ${safeName}!</h2>
      <p>Thank you for reaching out. I've received your message and will get back to you within 24 hours.</p>
      <p>Best,<br />Dhananjay Kakade</p>
    `,
  })

  if (confirmation.error) {
    throw new Error(`Resend confirmation failed: ${confirmation.error.message}`)
  }
}
