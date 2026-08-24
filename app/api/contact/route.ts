import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { contactInfo } from '@/lib/portfolio-data'

const recipient = contactInfo.email

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string
      email?: string
      about?: string
      message?: string
    }
    const name = body.name?.trim()
    const email = body.email?.trim()
    const about = body.about?.trim()
    const message = body.message?.trim()
    if (
      !name ||
      name.length < 2 ||
      !email ||
      !/^\S+@\S+\.\S+$/.test(email) ||
      !message ||
      message.length < 10
    )
      return NextResponse.json({ error: 'Please provide valid contact details.' }, { status: 400 })
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL)
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 503 })
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: recipient,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}${about ? `\nAbout: ${about}` : ''}\n\n${message}`,
    })
    if (error) return NextResponse.json({ error: 'Unable to send message.' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
