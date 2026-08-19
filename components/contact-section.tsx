import { ContactForm } from '@/components/contact-form'
import { ContactInfoRows } from '@/components/contact-info-rows'

/* The rows-and-form pair shared by the homepage contact section and the standalone
   /contact page. Each caller supplies its own heading/lede, matching that page's
   existing heading convention (h2 eyebrow on the homepage, subpage-hero h1 elsewhere). */
export function ContactSection() {
  return (
    <div className="contact-columns">
      <ContactInfoRows />
      <ContactForm />
    </div>
  )
}
