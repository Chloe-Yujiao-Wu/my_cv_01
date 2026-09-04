import { about } from '../data/resume'
import SectionTitle from './SectionTitle'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-content">
        <SectionTitle eyebrow="About Me" title="关于我" lead={about.lead} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          {/* 左侧: 人像 */}
          <div className="flex justify-center">
            <img
              src={about.portrait}
              alt={`${about.heading}`}
              className="aspect-[4/5] w-full max-w-[16rem] rounded-2xl object-cover"
              loading="lazy"
            />
          </div>

          {/* 右侧: 介绍文字 + 信息卡片 */}
          <div>
            <h3 className="heading-2">
              {about.heading}
            </h3>
            <p className="body-base mt-6">{about.body}</p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {about.cards.map((card) => (
                <div key={card.title} className="rounded-xl bg-card p-6">
                  <h4 className="heading-4">{card.title}</h4>
                  <p className="body-sm mt-3">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
