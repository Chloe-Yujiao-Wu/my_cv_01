import { skills } from '../data/resume'
import SectionTitle from './SectionTitle'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-content">
        <SectionTitle
          eyebrow="Skills"
          title="技能与专业"
          lead=""
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.category} className="surface-card p-8">
              <h3 className="heading-4">{group.category}</h3>
              <ul className="mt-6 space-y-3.5">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-2 w-2 flex-none bg-accent" aria-hidden="true" />
                    <span className="body-base text-ink/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
