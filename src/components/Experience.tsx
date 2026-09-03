import { experiences } from '../data/resume'
import SectionTitle from './SectionTitle'

export default function Experience() {
  return (
    <section id="experience" className="section surface-soft">
      <div className="container-content">
        <SectionTitle eyebrow="Experience" title="工作履历" />

        <div className="mt-20 space-y-16">
          {experiences.map((exp) => (
            <div
              key={`${exp.company}-${exp.period}`}
              className="grid gap-6 lg:grid-cols-[200px_56px_1fr] lg:gap-0"
            >
              {/* 左列: 日期 + 地点 */}
              <div>
                <p className="text-xl font-black tracking-tight text-accent">{exp.period}</p>
                <p className="mt-2 text-base text-muted">{exp.location}</p>
              </div>

              {/* 中列: 时间线 */}
              <div className="hidden lg:flex lg:flex-col lg:items-center">
                <span className="mt-2 h-3 w-3 flex-none rounded-full bg-accent" aria-hidden="true" />
                <span className="mt-2 w-px flex-1 bg-line" aria-hidden="true" />
              </div>

              {/* 右列: 职位 + 成就列表 */}
              <div>
                <h3 className="text-2xl font-black tracking-tight text-ink sm:text-3xl">
                  {exp.role}{' '}
                  <span className="text-xl font-bold text-muted sm:text-2xl">@{exp.company}</span>
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {exp.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span className="text-lg leading-relaxed text-ink/90">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
