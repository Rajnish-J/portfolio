'use client'

import { Send } from 'lucide-react'
import { FormEvent, useState } from 'react'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      form.reset()
      setStatus('sent')
    } else setStatus('error')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" required minLength={2} placeholder="Your name" />
      </label>
      <label>
        Email
        <input name="email" required type="email" placeholder="you@company.com" />
      </label>
      <label>
        About
        <input name="about" placeholder="role · consulting · just saying hi" />
      </label>
      <label>
        Message
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Tell me about the problem you are solving..."
        />
      </label>
      <button className="button button-light" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'} <Send size={16} />
      </button>
      <p className={`form-status ${status}`}>
        {status === 'sent'
          ? 'Thanks — your message is on its way.'
          : status === 'error'
            ? 'Something went wrong. Please try again or email me directly.'
            : 'I usually reply within one working day.'}
      </p>
    </form>
  )
}
