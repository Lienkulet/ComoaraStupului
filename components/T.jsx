'use client'

import { useLanguage } from '@/context/LanguageContext'

// Inline translation component — usable in both server and client components.
// <T ro="Text în română" ru="Текст на русском" />
export default function T({ ro, ru }) {
  const { lang } = useLanguage()
  return lang === 'RU' ? ru : ro
}
