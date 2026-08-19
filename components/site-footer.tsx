import { Mail } from 'lucide-react'
import { SocialLinks } from '@/components/portfolio-enhancements'

export const contactEmail = 'rajnishofficial02@gmail.com'

/* One footer for every page. `children` is the single contextual link each page differs by;
   the copyright and the social row are the same everywhere. */
export function SiteFooter({ children }: { children?: React.ReactNode }) {
  return (
    <footer className="footer section-wrap">
      <span className="footer-copy">© 2026 Rajnish J · All rights reserved.</span>
      {children}
      <div className="footer-links">
        <a href={`mailto:${contactEmail}`} aria-label="Email">
          <Mail size={17} />
        </a>
        <SocialLinks compact />
      </div>
    </footer>
  )
}
