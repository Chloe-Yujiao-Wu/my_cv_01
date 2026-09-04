import { profile } from '../data/resume'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="container-content grid min-h-[92vh] grid-cols-[1fr_1fr] items-stretch gap-8 pb-20 pt-32 sm:gap-10">
        {/* 左侧: 徽章 + 超大标题 + 介绍 + CTA */}
        <div>
          <span className="label inline-block rounded-full border-[1.5px] border-accent px-4 py-1.5 text-accent">
            {profile.badge}
          </span>

          <h1 className="mt-8 whitespace-nowrap text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight text-ink">
            {profile.headline}
          </h1>

          <p className="body-lg mt-8 max-w-2xl text-lg sm:text-xl">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="label inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-white transition-colors hover:bg-accent-dark"
            >
              浏览项目细节
              <ArrowRightIcon className="h-4 w-4" />
            </a>
            <a
              href="resume.pdf"
              download="吴雨娇-个人简历.pdf"
              className="label inline-flex items-center gap-2 rounded-lg border-[1.5px] border-ink/20 bg-card px-6 py-3.5 text-ink transition-colors hover:border-ink/40"
            >
              下载个人简历
              <ArrowDownIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* 右侧: 技能标签卡片 */}
        <div className="h-full">
          <div className="surface-card flex h-full min-h-[60vh] flex-col justify-center rounded-[2rem] p-8 sm:p-10">
            <div className="flex flex-wrap gap-x-3 gap-y-3">
              {profile.heroTags.map((tag) =>
                tag === profile.heroTagHighlight ? (
                  <span
                    key={tag}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-white"
                  >
                    {tag}
                  </span>
                ) : (
                  <span
                    key={tag}
                    className="cursor-default rounded-full border border-line bg-card px-4 py-2 text-sm font-bold text-ink transition-all duration-300 ease-out hover:scale-110 hover:bg-accent hover:border-accent hover:text-white"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
