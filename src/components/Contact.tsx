import { contact, profile, socials } from '../data/resume'
import { ArrowUpRightIcon } from './Icons'

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-[rgb(var(--footer-rgb))] text-white transition-colors duration-300"
    >
      <div className="container-content grid gap-16 py-24 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* 左侧: CTA 标题 + 联系方式 */}
        <div>
          <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">
            {contact.heading}
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            {contact.description}
          </p>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/50">
                电子邮箱 / Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block break-all text-xl font-black tracking-tight text-white transition-colors hover:text-white/70 sm:text-2xl"
              >
                {profile.email}
              </a>
            </div>
            {profile.wechat && (
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-white/50">
                  即时通讯 / WeChat
                </p>
                <p className="mt-3 text-xl font-black tracking-tight text-white sm:text-2xl">
                  {profile.wechat}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧: 社交账户卡片 */}
        {socials.length > 0 && (
          <div>
            <h3 className="text-2xl font-black tracking-tight">{contact.socialTitle}</h3>
            <div className="mt-8 space-y-4">
              {socials.map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-white/25 hover:bg-white/10"
                >
                  <div>
                    <p className="text-lg font-bold text-white">{s.title}</p>
                    <p className="mt-1 text-sm text-white/50">{s.handle}</p>
                  </div>
                  <ArrowUpRightIcon className="h-5 w-5 flex-none text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
