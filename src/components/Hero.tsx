import { useCallback, useRef, useState } from 'react'
import { profile } from '../data/resume'
import { ArrowDownIcon, ArrowRightIcon } from './Icons'
import TagSpiral from './TagSpiral'
import SunsetScene from './SunsetScene'

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
      {/* 第一屏: 暮色山丘舞者全屏场景 */}
      <div
        className="relative h-[100svh] min-h-[640px] overflow-hidden"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <h1 className="sr-only">{profile.headline}</h1>
        <SunsetScene progress={progress} />

        {/* 左下角信息区: 徽章 + 简介 + CTA */}
        <div className="absolute inset-x-0 bottom-0 z-10 pb-10 sm:pb-14">
          <div className="container-content">
            <div className="max-w-xl rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-md sm:p-8">
              <span className="label inline-block rounded-full border border-white/40 px-4 py-1.5 text-white">
                {profile.badge}
              </span>

              <p className="mt-4 text-base font-medium leading-relaxed text-white/95 sm:text-lg">
                {profile.intro.split('吴雨娇').reduce<JSX.Element[]>((parts, chunk, i, arr) => {
                  parts.push(<span key={`t-${i}`}>{chunk}</span>)
                  if (i < arr.length - 1) {
                    parts.push(
                      <span key={`n-${i}`} className="font-bold text-black">
                        吴雨娇
                      </span>,
                    )
                  }
                  return parts
                }, [])}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="label inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-[#4A2C3C] transition-colors hover:bg-white/85"
                >
                  浏览项目细节
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
                <a
                  href="resume.pdf"
                  download="吴雨娇-个人简历.pdf"
                  className="label inline-flex items-center gap-2 rounded-lg border-[1.5px] border-white/50 px-6 py-3.5 text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  下载个人简历
                  <ArrowDownIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 技能标签 (紧随第一屏) */}
      <div className="border-t border-line bg-canvas">
        <div className="container-content py-16">
          <TagSpiral />
        </div>
      </div>
    </section>
  )
}
