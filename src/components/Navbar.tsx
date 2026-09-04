import { useEffect, useState } from 'react'
import { profile } from '../data/resume'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { label: '关于', href: '#about' },
  { label: '履历', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '项目', href: '#projects' },
  { label: '教育', href: '#education' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          <span className="heading-4 text-ink">{profile.name}</span>
          <span className="h-5 w-px bg-line" aria-hidden="true" />
          <span className="label text-muted">{profile.role}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label text-ink transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="label rounded-lg bg-ink px-5 py-2.5 text-canvas transition-opacity hover:opacity-80"
          >
            联系合作
          </a>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-soft"
            aria-label="切换菜单"
            aria-expanded={open}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-5 w-5">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-canvas md:hidden">
          <div className="container-content flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="label rounded-md px-3 py-2.5 text-ink hover:bg-soft"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="label mt-2 rounded-lg bg-ink px-4 py-2.5 text-center text-canvas"
            >
              联系合作
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
