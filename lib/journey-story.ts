import { Bot, BrainCircuit, Castle, Code2, GraduationCap, MapPin, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { journey } from '@/lib/portfolio-data'

export type JourneyStep = {
  id: string
  date: string
  role: string
  company: string
  summary: string
  icon: LucideIcon
  details?: string[]
}

const earlyJourney: JourneyStep[] = [
  {
    id: 'beginning',
    date: '2002',
    role: 'The Beginning',
    company: 'Chennai, Tamil Nadu',
    summary: 'Born in Chennai, Tamil Nadu. The journey of curiosity and learning begins.',
    icon: MapPin,
  },
  {
    id: 'foundation',
    date: '2018',
    role: 'Foundation Years',
    company: 'SSLC · 86.6%',
    summary:
      'Completed SSLC with 86.6%. Strong academic foundation and a growing interest in technology.',
    icon: GraduationCap,
  },
  {
    id: 'higher-secondary',
    date: '2020',
    role: 'Higher Secondary',
    company: 'Science stream',
    summary: 'Computer Science sparked a passion for programming.',
    icon: Code2,
  },
  {
    id: 'engineering',
    date: '2020 — 2024',
    role: 'Engineering Journey',
    company: 'Panimalar Engineering College',
    summary: 'B.E. in ECE. Discovered a love for software development.',
    icon: BrainCircuit,
  },
  {
    id: 'innovation',
    date: '2022',
    role: 'First Innovation',
    company: 'M.A.I.D · Arduino',
    summary: 'Created a cleaning robot — the first taste of bringing ideas to life.',
    icon: Bot,
  },
  {
    id: 'skills',
    date: '2023',
    role: 'Skill Development',
    company: 'Projects and practice',
    summary: 'Mastered languages and frameworks through practical projects.',
    icon: Sparkles,
  },
  {
    id: 'graduate',
    date: '2024',
    role: 'Professional Ready',
    company: 'Graduated · 8.78 CGPA',
    summary: 'Ready to contribute to innovative software solutions.',
    icon: GraduationCap,
  },
]

export const journeyStory: JourneyStep[] = [
  ...earlyJourney,
  ...journey.map((item) => ({
    id: item.id,
    date: item.date,
    role: item.role,
    company: item.company,
    summary: item.summary,
    details: item.details,
    icon: BrainCircuit,
  })),
  {
    id: 'future',
    date: 'Future',
    role: 'The Road Ahead',
    company: 'Still building. Still learning.',
    summary: 'Today’s destination becomes tomorrow’s starting point.',
    icon: Castle,
  },
]
