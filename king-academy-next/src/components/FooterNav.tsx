'use client'
import Link from 'next/link'
import { useActiveSave } from '@/hooks/useActiveSave'

export function FooterNav() {
  const { activeSaveId } = useActiveSave()
  return (
    <nav className="sticky bottom-0 z-20 bg-white/80 backdrop-blur border-t md:hidden">
      <div className="mx-auto max-w-6xl grid grid-cols-5 text-center">
        <Link href={activeSaveId ? `/game/${activeSaveId}` : '/saves'} className="p-3">Jogo</Link>
        <Link href={activeSaveId ? `/sheet/${activeSaveId}` : '/saves'} className="p-3">Ficha</Link>
        <Link href={activeSaveId ? `/progress/${activeSaveId}` : '/saves'} className="p-3">Progresso</Link>
        <Link href="/saves" className="p-3">Saves</Link>
        <Link href="/settings" className="p-3">Config</Link>
      </div>
    </nav>
  )
}
