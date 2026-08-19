'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { contactInfo } from '@/lib/portfolio-data'

export function ContactInfoRows() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactInfo.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard permission denied or unavailable — the email is still visible to copy by hand.
    }
  }

  return (
    <div className="contact-rows">
      <div className="contact-row">
        <span className="contact-row-label">Email</span>
        <span className="contact-row-value">{contactInfo.email}</span>
        <button className="contact-row-action" type="button" onClick={copyEmail}>
          {copied ? 'Copied' : 'Copy'} <ArrowUpRight size={12} />
        </button>
      </div>
      <div className="contact-row">
        <span className="contact-row-label">Phone</span>
        <span className="contact-row-value">{contactInfo.phone}</span>
        <a className="contact-row-action" href={contactInfo.phoneHref}>
          Tel <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-row-label">LinkedIn</span>
        <span className="contact-row-value">{contactInfo.linkedinHandle}</span>
        <a
          className="contact-row-action"
          href={contactInfo.linkedinUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-row-label">GitHub</span>
        <span className="contact-row-value">{contactInfo.githubHandle}</span>
        <a
          className="contact-row-action"
          href={contactInfo.githubUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open <ArrowUpRight size={12} />
        </a>
      </div>
      <div className="contact-row">
        <span className="contact-row-label">Location</span>
        <span className="contact-row-value">{contactInfo.location}</span>
        <span className="contact-row-empty">—</span>
      </div>
      <div className="contact-row">
        <span className="contact-row-label">Status</span>
        <span className="contact-row-value">
          <span className="contact-status">
            <i aria-hidden="true" />
            {contactInfo.status}
          </span>
        </span>
        <span className="contact-row-empty">—</span>
      </div>
    </div>
  )
}
