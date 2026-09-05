import { useEffect, useState } from 'react'
import { profile } from '../data/resume'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-canvas/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container-content flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <span className="heading-4 text-black dark:text-white">{profile.name}</span>
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <span className="label text-muted">{profile.role}</span>
        </a>

        {/* 导航项已移至第一屏场景边缘, 此处仅保留主题切换 */}
        <ThemeToggle />
      </nav>
    </header>
  )
}
