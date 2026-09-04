import { useEffect, useState } from 'react'

const sections = [
  { id: 'about', label: '关于' },
  { id: 'experience', label: '履历' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '项目' },
  { id: 'education', label: '教育' },
  { id: 'contact', label: '联系' },
]

export default function SideNav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [showArrow, setShowArrow] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' },
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    const onScroll = () => {
      setShowArrow(window.scrollY > 600)
      setVisible(window.scrollY > 400)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* 左侧目录 - 从第二页开始展示 */}
      <nav
        className={`fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-300 lg:block ${
          visible ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <ul className="space-y-5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`group flex items-center gap-3 text-sm font-bold transition-colors duration-300 ${
                  activeSection === s.id ? 'text-accent' : 'text-muted hover:text-ink'
                }`}
              >
                <span
                  className={`h-1 rounded-full transition-all duration-300 ${
                    activeSection === s.id ? 'w-8 bg-accent' : 'w-4 bg-line group-hover:bg-muted'
                  }`}
                />
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 右下角回到顶部箭头 */}
      {showArrow && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-accent-dark"
          aria-label="回到顶部"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  )
}
