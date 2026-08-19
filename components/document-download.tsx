'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDownToLine, Check, ChevronDown } from 'lucide-react'

type DocumentChoice = 'resume' | 'cv' | 'both'

const documents: Record<Exclude<DocumentChoice, 'both'>, { label: string; file: string }> = {
  resume: { label: 'Resume', file: '/resume/Resume.pdf' },
  cv: { label: 'CV', file: '/resume/CV.pdf' },
}

function downloadFile(file: string, filename: string) {
  const link = document.createElement('a')
  link.href = file
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export function DocumentDownload() {
  const [selected, setSelected] = useState<DocumentChoice>('resume')
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'downloading' | 'done'>('idle')
  const [run, setRun] = useState(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    function closeOnOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  useEffect(
    () => () => {
      timers.current.forEach(window.clearTimeout)
      timers.current = []
    },
    [],
  )

  function trigger(choice: DocumentChoice) {
    timers.current.forEach(window.clearTimeout)
    timers.current = []
    setSelected(choice)
    setOpen(false)
    setRun((index) => index + 1)
    setStatus('downloading')
    if (choice === 'both') {
      downloadFile(documents.resume.file, 'Rajnish-Resume.pdf')
      timers.current.push(
        window.setTimeout(() => downloadFile(documents.cv.file, 'Rajnish-CV.pdf'), 250),
      )
    } else {
      downloadFile(documents[choice].file, `Rajnish-${documents[choice].label}.pdf`)
    }
    const sweep = choice === 'both' ? 1600 : 1200
    timers.current.push(window.setTimeout(() => setStatus('done'), sweep))
    timers.current.push(window.setTimeout(() => setStatus('idle'), sweep + 1300))
  }

  const label =
    status === 'downloading'
      ? 'Downloading…'
      : status === 'done'
        ? 'Downloaded'
        : `Download ${selected === 'both' ? 'both' : documents[selected].label}`

  return (
    <div className="document-download" ref={menuRef}>
      <div
        className={`document-button-group${status === 'idle' ? '' : ` is-${status}`}${selected === 'both' ? ' is-both' : ''}`}
      >
        <button
          className="button button-dark document-primary"
          type="button"
          onClick={() => trigger(selected)}
        >
          {status === 'done' ? <Check size={16} /> : <ArrowDownToLine size={16} />}{' '}
          <span aria-live="polite">{label}</span>
        </button>
        <button
          className="button button-dark document-menu-trigger"
          type="button"
          aria-label="Choose download document"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <ChevronDown size={16} />
        </button>
        {status === 'downloading' && (
          <span key={run} className="download-sweep" aria-hidden="true" />
        )}
      </div>
      {open && (
        <div className="document-menu" role="menu">
          <button
            type="button"
            role="menuitem"
            className="document-option"
            onClick={() => trigger('resume')}
          >
            <span>Download Resume</span>
            <ArrowDownToLine size={14} />
          </button>
          <button
            type="button"
            role="menuitem"
            className="document-option"
            onClick={() => trigger('cv')}
          >
            <span>Download CV</span>
            <ArrowDownToLine size={14} />
          </button>
          <button
            type="button"
            role="menuitem"
            className="document-option"
            onClick={() => trigger('both')}
          >
            <span>Download both</span>
            <Check size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
