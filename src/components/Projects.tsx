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
          lead=""
        />

        <div className="mt-16 space-y-10 lg:space-y-16">
          {projects.map((p, idx) => (
            <article
              key={p.name}
              className="group surface-card grid cursor-pointer overflow-hidden transition-shadow hover:shadow-lg lg:grid-cols-2"
              onClick={() => setActive(p)}
            >
              {/* 项目配图 (奇数项左右交替) */}
              <div className={`overflow-hidden ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={p.image}
                  alt={p.name}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] lg:aspect-auto lg:h-full"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col justify-center p-8 lg:p-14">
                <p className="label text-accent">{p.category}</p>
                <h3 className="heading-2 mt-3 lg:text-4xl">
                  {p.name}
                </h3>
                <p className="body-base mt-5">{p.description}</p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="label rounded-md bg-accent/10 px-3 py-1.5 text-accent"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <span className="label mt-8 inline-flex items-center gap-1.5 font-bold text-ink">
                  细节
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
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
            className="relative flex max-h-[85vh] w-[92%] max-w-4xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
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
                <p className="label text-accent">{active.category}</p>
                <h3 className="heading-2 mt-2">
                  {active.name}
                </h3>
                <p className="body-base mt-4">{active.description}</p>

                {/* 详细内容列表 */}
                <div className="mt-8 space-y-6">
                  <h4 className="heading-4">项目详情</h4>
                  <div className="space-y-5">
                    {active.details.map((d, i) => {
                      const parts = d.split('：')
                      const title = parts[0]
                      const content = parts.slice(1).join('：')
                      return (
                        <div key={i} className="flex gap-3">
                          <span className="heading-4 flex-none">{title}：</span>
                          <span className="body-base">{content}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* 技术标签 */}
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="label rounded-md bg-accent/10 px-3 py-1.5 text-accent"
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
