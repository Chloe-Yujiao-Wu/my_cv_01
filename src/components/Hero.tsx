import { profile } from '../data/resume'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'
import TagSpiral from './TagSpiral'
import SkyScene from './SkyScene'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* 天空动图背景: 云朵漂移 + 大雁飞翔 */}
      <SkyScene />
      <div className="container-content relative z-10 flex min-h-[92vh] flex-col items-center justify-center pb-20 pt-32 text-center">
        {/* 居中: 徽章 + 超大标题 + 介绍 + CTA */}
        <span className="label inline-block rounded-full border-[1.5px] border-accent px-4 py-1.5 text-accent">
          {profile.badge}
        </span>

        <h1 className="mt-8 whitespace-nowrap text-[clamp(2.5rem,8vw,6.5rem)] font-black leading-[1.05] tracking-tight text-ink">
          {profile.headline}
        </h1>

        <p className="body-lg mt-8 max-w-2xl text-lg sm:text-xl">
          {profile.intro.split('吴雨娇').reduce<JSX.Element[]>((parts, chunk, i, arr) => {
            parts.push(<span key={`t-${i}`}>{chunk}</span>)
            if (i < arr.length - 1) {
              parts.push(
                <span key={`n-${i}`} className="font-bold text-black dark:text-white">
                  吴雨娇
                </span>,
              )
            }
            return parts
          }, [])}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

        {/* 居中: 技能标签螺旋卡片 */}
        <div className="mt-14 w-full max-w-xl">
          <TagSpiral />
        </div>
      </div>
    </section>
  )
}
