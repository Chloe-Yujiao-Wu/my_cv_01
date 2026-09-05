import { useCallback, useRef, useState } from 'react'
import { profile } from '../data/resume'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'
import TagSpiral from './TagSpiral'
import HeroScene from './HeroScene'

export default function Hero() {
  // 鼠标横向进度 0-1: 驱动描边标题从左到右浮现
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(0)

  const handleMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => setProgress(Math.min(1, Math.max(0, x))))
  }, [])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => setProgress(0))
  }, [])

  return (
    <section id="top" className="relative">
      {/* 第一屏: 沙色 ASCII 场景 (导航在场景边缘, 真人人物) */}
      <div
        className="relative h-[100svh] min-h-[640px] overflow-hidden"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <h1 className="sr-only">{profile.headline}</h1>
        <HeroScene progress={progress} />
      </div>

      {/* 下一页: 徽章 + 简介 + CTA */}
      <div className="border-t border-line bg-canvas">
        <div className="container-content flex flex-col items-center py-16 text-center sm:py-20">
          <span className="label inline-block rounded-full border-[1.5px] border-accent px-4 py-1.5 text-accent">
            {profile.badge}
          </span>

          <p className="body-lg mt-6 max-w-2xl text-lg sm:text-xl">
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

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
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
      </div>

      {/* 技能标签 */}
      <div className="border-t border-line bg-canvas">
        <div className="container-content py-16">
          <TagSpiral />
        </div>
      </div>
    </section>
  )
}
