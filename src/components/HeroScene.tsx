/**
 * Hero 第一屏场景: 沙色 ASCII 艺术 / 像素文本风格
 * 极简高对比: 近黑等宽字符构成矩形与梯形边界, 科技怀旧工业感
 * 导航项 (关于/履历/技能/项目/教育/联系) 展示在外框上边缘
 * 真人人物照片融入沙色场景; 鼠标横滑时简历标题沿矩形/梯形描边从左到右浮现
 */

import { profile } from '../data/resume'

interface HeroSceneProps {
  /** 鼠标在首屏的横向进度 0-1, 控制描边标题的显现范围 */
  progress: number
}

const MONO = "'SF Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, 'Courier New', monospace"

/** 字符边: "+ · " 重复, 溢出路径末端自动裁剪 */
const edgeChars = '+ · '.repeat(170)
/** 描边标题: 简历标题 + 姓名 */
const titleText = Array(4).fill(`${profile.headline} · ${profile.name}`).join(' · · ')

/** 外框 (顶部下移, 避开固定导航栏) */
const OUTER_FRAME = 'M 40 88 H 1400 V 772 H 40 Z'
/** 人物照片矩形框 */
const FIGURE_FRAME = 'M 460 170 H 980 V 690 H 460 Z'
/** 右侧梯形 */
const TRAPEZOID = 'M 1040 230 L 1370 300 L 1320 560 L 1090 470 Z'

/** 顶部边缘导航项 */
const NAV_ITEMS = [
  { label: '关于', href: '#about' },
  { label: '履历', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '项目', href: '#projects' },
  { label: '教育', href: '#education' },
  { label: '联系', href: '#contact' },
]

export default function HeroScene({ progress }: HeroSceneProps) {
  const revealX = (Math.min(1, Math.max(0, progress)) - 1) * 1470

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* 羽化模糊: 用于蒙版内白色矩形边缘 */}
          <filter id="feather-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          {/* 人物照片边缘羽化, 融入沙色背景: 黑色隐藏全部, 单个内缩白矩形模糊后让边缘渐隐 */}
          <mask id="figure-feather">
            <rect x="0" y="0" width="1440" height="810" fill="black" />
            <rect
              x="502"
              y="212"
              width="436"
              height="436"
              fill="white"
              filter="url(#feather-blur)"
            />
          </mask>
          {/* 鼠标进度揭示框: 从左到右展开 (直接驱动 x 属性, 避免 clipPath 内 CSS transform 兼容问题) */}
          <clipPath id="outline-reveal">
            <rect x={revealX - 10} y="-10" width="1470" height="830" />
          </clipPath>
          {/* 描边路径 */}
          <path id="path-outer" d={OUTER_FRAME} />
          <path id="path-figure" d={FIGURE_FRAME} />
          <path id="path-trapezoid" d={TRAPEZOID} />
        </defs>

        {/* ===== 沙色底 ===== */}
        <rect x="0" y="0" width="1440" height="810" fill="#DFD5C0" />

        {/* ===== 真人人物照片 (羽化融入沙地) ===== */}
        <image
          href={`${import.meta.env.BASE_URL}images/portrait.jpg`}
          x="460"
          y="170"
          width="520"
          height="520"
          preserveAspectRatio="xMidYMid slice"
          mask="url(#figure-feather)"
        />

        {/* ===== 外框: 字符矩形边界 ===== */}
        <text fontSize="13" fill="#211D18" style={{ fontFamily: MONO }} opacity="0.85">
          <textPath href="#path-outer" startOffset="0">
            {edgeChars}
          </textPath>
        </text>

        {/* ===== 人物矩形框: 字符边界 ===== */}
        <text fontSize="12" fill="#211D18" style={{ fontFamily: MONO }} opacity="0.8">
          <textPath href="#path-figure" startOffset="0">
            {edgeChars}
          </textPath>
        </text>

        {/* ===== 右侧梯形: 字符边界 ===== */}
        <text fontSize="12" fill="#211D18" style={{ fontFamily: MONO }} opacity="0.8">
          <textPath href="#path-trapezoid" startOffset="0">
            {edgeChars}
          </textPath>
        </text>

        {/* ===== 顶部边缘导航 ===== */}
        <g className="scene-nav" style={{ fontFamily: MONO }}>
          {NAV_ITEMS.map((item, i) => (
            <a key={item.href} href={item.href}>
              <text
                x={130 + i * 228}
                y="134"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                letterSpacing="6"
                fill="#211D18"
              >
                {item.label}
              </text>
            </a>
          ))}
        </g>

        {/* ===== 描边浮现的简历标题 (鼠标从左到右滑动时显现) ===== */}
        <g clipPath="url(#outline-reveal)">
          <text fontSize="15" fontWeight="600" letterSpacing="4" fill="#211D18" style={{ fontFamily: MONO }} opacity="0.9">
            <textPath href="#path-figure" startOffset="26">
              {titleText}
            </textPath>
          </text>
          <text fontSize="13" fontWeight="600" letterSpacing="3" fill="#211D18" style={{ fontFamily: MONO }} opacity="0.85">
            <textPath href="#path-trapezoid" startOffset="10">
              {titleText}
            </textPath>
          </text>
        </g>

        {/* ===== 科技怀旧装饰 ===== */}
        <g style={{ fontFamily: MONO }} fill="#211D18">
          <text x="70" y="748" fontSize="13" letterSpacing="2" opacity="0.75">
            READY <tspan className="blink-cursor">█</tspan>
          </text>
          <text x="1370" y="748" fontSize="13" letterSpacing="2" textAnchor="end" opacity="0.75">
            36.06°N 120.19°E · GUANGZHOU · CN
          </text>
          <text x="1205" y="386" fontSize="12" letterSpacing="3" textAnchor="middle" opacity="0.6">
            CV / 2026
          </text>
          <text x="1205" y="408" fontSize="12" letterSpacing="3" textAnchor="middle" opacity="0.6">
            SIG · OK
          </text>
          {/* 梯形内部斜纹装饰 (像素梯形感) */}
          <g opacity="0.35">
            <text x="1130" y="330" fontSize="11" letterSpacing="1">
              0100
            </text>
            <text x="1180" y="470" fontSize="11" letterSpacing="1">
              1011
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}
