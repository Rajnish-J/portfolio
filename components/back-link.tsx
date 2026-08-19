import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

/* Lives in the page body, on its own row under the eyebrow — not in the header, where it
   competed with the theme toggle and the menu button for room on a phone. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link className="back-link page-back" href={href}>
      <ArrowLeft size={15} /> {label}
    </Link>
  )
}
