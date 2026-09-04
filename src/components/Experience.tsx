import { useState } from 'react'
import { experiences } from '../data/resume'
import SectionTitle from './SectionTitle'

export default function Experience() {
  // 提取所有时间段作为筛选项,按时间倒序
  const allPeriods = experiences.map((exp) => exp.period)

  // 从 localStorage 读取上次选择,首次默认全选
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('exp-selected-periods')
      if (saved) {
        const parsed = JSON.parse(saved) as string[]
        // 只保留仍然存在的时段
        const valid = parsed.filter((p) => allPeriods.includes(p))
        return valid.length > 0 ? valid : allPeriods
      }
    } catch {}
    return allPeriods
  })
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // 选择变化时保存到 localStorage
  const togglePeriod = (period: string) => {
    setSelectedPeriods((prev) => {
      const next = prev.includes(period) ? prev.filter((p) => p !== period) : [...prev, period]
      localStorage.setItem('exp-selected-periods', JSON.stringify(next))
      return next
    })
  }

  const selectAll = () => {
    setSelectedPeriods(allPeriods)
    localStorage.setItem('exp-selected-periods', JSON.stringify(allPeriods))
  }

  const selectNone = () => {
    setSelectedPeriods([])
    localStorage.setItem('exp-selected-periods', JSON.stringify([]))
  }

  const filteredExperiences = experiences.filter((exp) => selectedPeriods.includes(exp.period))

  return (
    <section id="experience" className="section surface-soft">
      <div className="container-content">
        <SectionTitle eyebrow="Experience" title="工作履历" />

        {/* 筛选项 - 下拉菜单 */}
        <div className="mt-12">
          <div className="relative inline-block">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-lg border-[1.5px] border-line bg-card px-5 py-3 text-sm font-bold text-ink transition-colors hover:border-accent"
            >
              <span>筛选时间段</span>
              <span className="rounded-full bg-soft px-2 py-0.5 text-xs font-bold text-accent">
                {selectedPeriods.length}/{allPeriods.length}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute left-0 top-full z-20 mt-2 w-64 rounded-xl border border-line bg-card p-2 shadow-lg">
                  {allPeriods.map((period) => {
                    const isActive = selectedPeriods.includes(period)
                    return (
                      <label
                        key={period}
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-soft"
                      >
                        <span
                          className={`flex h-5 w-5 flex-none items-center justify-center rounded border-[1.5px] transition-colors duration-200 ${
                            isActive ? 'border-accent bg-accent' : 'border-line bg-transparent'
                          }`}
                        >
                          {isActive && (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => togglePeriod(period)}
                          className="sr-only"
                        />
                        <span className={`text-sm font-semibold ${isActive ? 'text-accent' : 'text-ink'}`}>
                          {period}
                        </span>
                      </label>
                    )
                  })}
                  <div className="my-1 border-t border-line" />
                  <button
                    type="button"
                    onClick={selectNone}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-muted transition-colors hover:bg-soft"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                    全不选
                  </button>
                  <button
                    type="button"
                    onClick={selectAll}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold text-accent transition-colors hover:bg-soft"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M4 12h16M4 6h16M4 18h16" />
                    </svg>
                    全选
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 工作履历卡片 */}
        <div className="mt-10 max-h-[55vh] overflow-y-auto rounded-2xl border border-line bg-card p-8 shadow-sm sm:p-10">
          <div className="space-y-16">
            {filteredExperiences.map((exp) => (
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
      </div>
    </section>
  )
}
