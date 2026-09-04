import { useEffect, useMemo, useRef, useState } from 'react'
import { profile } from '../data/resume'

// 斐波那契黄金角(弧度): 约 137.5°
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const FONT_SIZE = 14
const CJK_STEP = 15 // 中文字间距(px)
const LATIN_STEP = 9 // 拉丁/数字字间距(px)
const ARC_STEP = 20 // 圆环弧间距(px), 加大避免文字重叠
// 悬停统一放大倍数: 所有标签的缩放完全相同
const HOVER_SCALE = 1.3
// 空间不够时允许的最小字号(按比例减小, 维持视觉等比)
const MIN_FONT_RATIO = 0.85
// 卡片圆角半径(与容器 rounded-[2rem] 一致, 放大态标签四角不能进入该区域)
const CORNER_R = 32

// 单字占位宽度: 拉丁/数字较窄, 中文全宽
function charWidth(c: string): number {
  return /[A-Za-z0-9]/.test(c) ? LATIN_STEP : CJK_STEP
}

interface CharUnit {
  tagIndex: number
  char: string
}

interface CharPos {
  // 默认态: 同心圆位置
  ringX: number
  ringY: number
  ringRot: number
  // 悬停态: 标签中心 + 单字相对标签中心的横向偏移
  centerX: number
  centerY: number
  ox: number
  // 字号比例: 空间不足时整体缩小以适配卡片(所有标签共享同一个值, 保证缩放一致)
  fontRatio: number
  // 悬停统一放大倍数(所有标签同一个值, 空间不足自动减小)
  hoverScale: number
}

export default function TagSpiral() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [hoveredTag, setHoveredTag] = useState<number | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  // 测量容器尺寸
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // 随机种子: 只在首渲染时生成一次, 贯穿整个组件生命周期
  // 保证圆环、螺旋两种状态的排序每次进入/离开悬停区域都完全一致
  const seedRef = useRef<{ spiralOffset: number; ringStartAngles: number[] } | null>(null)
  if (seedRef.current === null) {
    // 预先给 32 圈分配起始角度(覆盖所有可能圈数), 避免 useMemo 每次重算时 Math.random() 产生新值
    const ringStarts: number[] = []
    for (let i = 0; i < 32; i++) ringStarts.push(Math.random() * Math.PI * 2)
    seedRef.current = { spiralOffset: Math.random() * Math.PI * 2, ringStartAngles: ringStarts }
  }

  // 拍平为单字序列(去掉空格)
  const chars = useMemo<CharUnit[]>(
    () =>
      profile.heroTags.flatMap((tag, tagIndex) =>
        Array.from(tag.replace(/\s/g, '')).map((char) => ({ tagIndex, char })),
      ),
    [],
  )

  const positions = useMemo<CharPos[]>(() => {
    const { w, h } = size
    if (!w || !h)
      return chars.map(() => ({
        ringX: 0, ringY: 0, ringRot: 0,
        centerX: 0, centerY: 0, ox: 0, fontRatio: 1, hoverScale: HOVER_SCALE,
      }))

    const cx = w / 2
    const cy = h / 2

    // ---- 默认态: 同心圆分布 ----
    const ringPos: { x: number; y: number; rot: number }[] = []
    const minDim = Math.min(w, h)
    const r0 = minDim * 0.13
    const rMax = minDim / 2 - 44
    // 先估算需要多少圈, 再把圈半径均匀控制在卡片内(防止外圈文字被裁切)
    let ringCount = 0
    let probe = r0
    let capSum = 0
    while (capSum < chars.length) {
      capSum += Math.floor((2 * Math.PI * probe) / ARC_STEP)
      ringCount++
      probe += ARC_STEP * 1.5
    }
    const ringGap = Math.max((rMax - r0) / Math.max(ringCount - 1, 1), ARC_STEP * 1.5)
    let innerR = r0
    let placed = 0
    let ringIdx = 0
    while (placed < chars.length) {
      const capacity = Math.floor((2 * Math.PI * innerR) / ARC_STEP)
      const count = Math.min(capacity, chars.length - placed)
      const startAngle = seedRef.current!.ringStartAngles[ringIdx % 32]
      ringIdx++
      for (let j = 0; j < count; j++) {
        const theta = startAngle + (j / count) * Math.PI * 2
        ringPos.push({
          x: cx + innerR * Math.cos(theta),
          y: cy + innerR * Math.sin(theta),
          rot: (theta * 180) / Math.PI + 90,
        })
      }
      placed += count
      innerR += ringGap
    }

    // ---- 悬停态: 标签按斐波那契螺旋定位 ----
    // 1× 渲染使用真实字号, 布局碰撞/边界约束则按「放大态占位」= (真实尺寸 × HOVER_SCALE + 额外间距),
    // 这样 1× 状态下标签间距天然宽松, 放大到 HOVER_SCALE 时也不重叠不出卡片
    const n = profile.heroTags.length
    // 标签真实 1× 宽度(正常 FONT_SIZE 对应的字距)
    const tagWidths = profile.heroTags.map(
      (tag) => Array.from(tag.replace(/\s/g, '')).reduce((s, c) => s + charWidth(c), 0),
    )
    const radii = tagWidths.map((tw) => Math.max(tw / 2, 26))
    const maxR = Math.min(w, h) * 0.40
    const k = maxR / Math.sqrt(n)
    // 初始点位: 斐波那契螺旋
    const centers = profile.heroTags.map((_, i) => {
      const r = k * Math.sqrt(i + 1.2)
      const angle = i * GOLDEN_ANGLE + seedRef.current!.spiralOffset
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
    })
    // 碰撞避让 + 边界约束: 按放大态占位做约束, 并在此基础上再加 PADDING, 让 1× 更疏朗
    const PAD = 10 // 额外像素间距: 越大越疏朗
    const packRadii = radii.map((r) => r * HOVER_SCALE + PAD)
    const realHalfH = (FONT_SIZE * 0.5) * HOVER_SCALE // 放大态真实半高
    const packHalfH = realHalfH + PAD * 0.5 // 带安全余量的半高约束
    // 四个圆角的圆心(仅作参考, 实际通过四边 CORNER_R+4 的安全边界保证不进入圆角区)
    const _corners = [
      { cx: CORNER_R, cy: CORNER_R },         // TL
      { cx: w - CORNER_R, cy: CORNER_R },     // TR
      { cx: CORNER_R, cy: h - CORNER_R },     // BL
      { cx: w - CORNER_R, cy: h - CORNER_R }, // BR
    ]
    void _corners
    for (let iter = 0; iter < 300; iter++) {
      // 1. 邻居互推
      for (let a = 0; a < n; a++) {
        for (let b = a + 1; b < n; b++) {
          const dx = centers[b].x - centers[a].x
          const dy = centers[b].y - centers[a].y
          const dist = Math.hypot(dx, dy) || 0.01
          const minDist = packRadii[a] + packRadii[b]
          if (dist < minDist) {
            const push = (minDist - dist) / 2
            const ux = dx / dist
            const uy = dy / dist
            centers[a].x -= ux * push
            centers[a].y -= uy * push
            centers[b].x += ux * push
            centers[b].y += uy * push
          }
        }
      }
      // 2. 四边直边界约束(向内再缩 CORNER_R 安全区, 留出 2rem 圆角的安全距离, 让标签不会进入四角)
      const SAFE = CORNER_R + 4
      centers.forEach((c, i) => {
        const minX = Math.max(packRadii[i], SAFE)
        const minY = Math.max(packHalfH, SAFE)
        c.x = Math.min(Math.max(c.x, minX), w - minX)
        c.y = Math.min(Math.max(c.y, minY), h - minY)
      })
    }

    // 布局后检查: 若放大态占位本身塞不下(极少发生), 才整体缩小字号
    let fontRatio = 1
    {
      let scale = 1
      for (let i = 0; i < n; i++) {
        const c = centers[i]
        const r = radii[i]
        const hHalf = FONT_SIZE * 0.5
        if (c.x - r < 0) scale = Math.min(scale, c.x / r)
        if (c.x + r > w) scale = Math.min(scale, (w - c.x) / r)
        if (c.y - hHalf < 0) scale = Math.min(scale, c.y / hHalf)
        if (c.y + hHalf > h) scale = Math.min(scale, (h - c.y) / hHalf)
      }
      fontRatio = Math.max(MIN_FONT_RATIO, scale)
    }

    // 每个单字相对标签中心的横向偏移(按真实 1× 渲染字距 × fontRatio)
    const charOffsets: { tagIndex: number; ox: number }[] = []
    profile.heroTags.forEach((tag, tagIndex) => {
      const clean = Array.from(tag.replace(/\s/g, ''))
      const totalWidth = tagWidths[tagIndex] * fontRatio
      let cursor = -totalWidth / 2
      clean.forEach((c) => {
        const wChar = charWidth(c) * fontRatio
        charOffsets.push({ tagIndex, ox: cursor + wChar / 2 })
        cursor += wChar
      })
    })

    return chars.map((unit, i) => ({
      ringX: ringPos[i].x,
      ringY: ringPos[i].y,
      ringRot: ringPos[i].rot,
      centerX: centers[unit.tagIndex].x,
      centerY: centers[unit.tagIndex].y,
      ox: charOffsets[i].ox,
      fontRatio,
      hoverScale: HOVER_SCALE,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, chars])

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[60vh] overflow-hidden rounded-[2rem] bg-[#0d0d10]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setHoveredTag(null)
      }}
      onMouseMove={(e) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>('[data-tag]')
        setHoveredTag(el ? Number(el.dataset.tag) : null)
      }}
    >
      {positions.map((p, i) => {
        const unit = chars[i]
        const isTagHovered = hovered && hoveredTag === unit.tagIndex
        // 统一缩放: 所有标签悬停时放大同一个 hoverScale 倍, 其他标签保持 1× 绝对不动
        const s = isTagHovered ? p.hoverScale : 1
        const x = hovered ? p.centerX + p.ox * s : p.ringX
        const y = hovered ? p.centerY : p.ringY
        const rot = hovered ? 0 : p.ringRot
        // 字号: 全部标签统一 fontRatio 比例, 保证 1× 不越卡片
        const fontSize = FONT_SIZE * p.fontRatio
        return (
          <span
            key={i}
            data-tag={unit.tagIndex}
            className="absolute left-0 top-0 will-change-transform"
            style={{
              transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rot}deg)`,
              transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
              transitionDelay: `${Math.min(i * 3, 150)}ms`,
              zIndex: isTagHovered ? 10 : 1,
            }}
          >
            <span
              className="inline-block cursor-default select-none whitespace-nowrap font-semibold transition-all duration-300 ease-out"
              style={{
                fontSize,
                color: isTagHovered
                  ? 'rgb(var(--accent-rgb))'
                  : hovered
                    ? 'rgba(255,255,255,0.75)'
                    : 'rgba(255,255,255,0.45)',
                transform: `scale(${s})`,
                transformOrigin: 'center',
                fontWeight: isTagHovered ? 800 : 600,
              }}
            >
              {unit.char}
            </span>
          </span>
        )
      })}
    </div>
  )
}
