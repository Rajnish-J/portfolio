import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BackLink } from '@/components/back-link'
import { ContactSection } from '@/components/contact-section'

export const metadata = {
  title: 'Contact — Rajnish J',
  description: 'Get in touch with Rajnish J for roles, consulting, or a conversation.',
}

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <section className="subpage-hero section-wrap">
        <p className="eyebrow">Have a good problem?</p>
        <BackLink href="/" label="Back home" />
        <h1>
          Let&apos;s make
          <br />
          <em>something useful.</em>
        </h1>
        <p className="subpage-lede">
          Whether you&apos;re building a product, untangling a system, or just want to compare notes
          — my inbox is open.
        </p>
      </section>
      <section className="section-wrap section-block">
        <ContactSection />
      </section>
      <SiteFooter>
        <Link href="/work">
          See the work <ArrowUpRight size={15} />
        </Link>
      </SiteFooter>
    </main>
  )
}
