import { projects } from '../data/resume'
import { ArrowUpRightIcon } from './Icons'
import SectionTitle from './SectionTitle'

export default function Projects() {
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
            <a
              key={p.name}
              href={p.link}
              className={`group surface-card flex flex-col overflow-hidden transition-shadow hover:shadow-lg ${
                idx === projects.length - 1 ? 'lg:col-span-2' : ''
              }`}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
