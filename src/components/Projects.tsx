import { useState, useEffect } from 'react'
import { projects, type ProjectItem } from '../data/resume'
import { ArrowUpRightIcon } from './Icons'
import SectionTitle from './SectionTitle'

export default function Projects() {
  const [active, setActive] = useState<ProjectItem | null>(null)

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setActive(null)
      }
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [active])

  return (
    <section id="projects" className="section surface-soft">
      <div className="container-content">
        <SectionTitle
          eyebrow="Portfolio"
          title="项目展示"
          lead="将复杂工程落地，为上百家商业组织创造价值。以下为代表性项目成果概览。"
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {projects.map((p, idx) => (
            <div
              key={p.name}
              className={`group surface-card flex cursor-pointer flex-col overflow-hidden transition-shadow hover:shadow-lg ${
                idx === projects.length - 1 ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setActive(p)}
            >
              {/* 项目配图 */}
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-8">
                <p className="text-sm font-bold text-accent">{p.category}</p>
                <h3 className="mt-2 text-2xl font-black tracking-tight text-ink sm:text-3xl">
                  {p.name}
                </h3>
                <p className="mt-4 flex-1 text-base leading-relaxed text-muted">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="mt-8 inline-flex items-center gap-1.5 text-base font-black text-ink">
                  细节
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 弹窗 */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative flex max-h-[80vh] w-[90%] max-w-2xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white transition-colors hover:bg-black/50"
              aria-label="关闭"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>

            {/* 可滚动内容区 */}
            <div className="overflow-y-auto">
              {/* 项目配图 */}
              <div className="overflow-hidden">
                <img
                  src={active.image}
                  alt={active.name}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>

              <div className="p-8">
                <p className="text-sm font-bold text-accent">{active.category}</p>
                <h3 className="mt-2 text-3xl font-black tracking-tight text-ink">
                  {active.name}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">{active.description}</p>

                {/* 详细内容列表 */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-lg font-bold text-ink">项目详情</h4>
                  <ul className="space-y-3">
                    {active.details.map((d, i) => (
                      <li key={i} className="flex gap-3 text-base leading-relaxed text-muted">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 技术标签 */}
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-accent/10 px-3 py-1.5 text-sm font-semibold text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
