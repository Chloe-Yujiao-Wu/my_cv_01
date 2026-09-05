import { education, credentials } from '../data/resume'
import SectionTitle from './SectionTitle'

export default function Education() {
  const hasCredentials = credentials && credentials.length > 0

  return (
    <section id="education" className="section">
      <div className="container-content">
        <SectionTitle eyebrow="Education" title="教育背景" />

        <div className={`mt-16 grid gap-8 ${hasCredentials ? 'lg:grid-cols-2' : ''}`}>
          {/* 学历卡片 */}
          <div className="surface-card flex flex-col justify-center p-10">
            <h3 className="heading-2">{education.school}</h3>
            <p className="heading-4 mt-5 text-ink">{education.degree}</p>
            <p className="body-base mt-2 whitespace-nowrap">{education.period}</p>
            <p className="body-base mt-6">{education.description}</p>
          </div>

          {/* 专业资质卡片 */}
          {hasCredentials && (
            <div className="surface-card p-10">
              <h3 className="heading-4">专业资质与学术成果</h3>
              <ul className="mt-8 space-y-7">
                {credentials.map((c) => (
                  <li key={c.name}>
                    <p className="heading-4 text-accent">{c.name}</p>
                    <p className="body-sm mt-1.5">{c.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
