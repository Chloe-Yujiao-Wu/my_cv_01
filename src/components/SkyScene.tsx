/**
 * Hero 天空动图场景
 * 还原参考图: 蓝天渐变 + 黄色描粉边的扇贝云 + 加拿大黑雁编队飞行
 * 云朵缓慢漂移, 大雁扇翅 + 上下起伏 + 从左向右缓慢飞过
 */

interface GooseProps {
  size: number
  duration: number
  delay: number
  top: string
  far?: boolean
}

/** 单只大雁 (侧面, 朝右, viewBox 220x140) */
function Goose({ size, duration, delay, top, far }: GooseProps) {
  return (
    <div
      className="sky-drift absolute left-0 will-change-transform"
      style={{ top, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <svg
        width={size}
        height={size * (140 / 220)}
        viewBox="0 0 220 140"
        className="goose-bob overflow-visible"
        style={far ? { opacity: 0.88 } : undefined}
      >
        {/* 远侧翅膀 (扇翅, 反相) */}
        <g className="wing-far">
          <path
            d="M104 62 C 88 34, 68 16, 46 9 C 40 7, 36 11, 39 16 C 54 27, 70 45, 82 62 C 90 71, 99 71, 104 62 Z"
            fill="#4A3D34"
          />
          <path
            d="M96 58 C 84 40, 70 26, 54 16 C 64 28, 76 44, 86 60 Z"
            fill="#6B5647"
          />
        </g>

        {/* 尾羽 (深色, 带白衬) */}
        <path d="M34 92 L10 80 L20 94 L8 97 L24 102 L38 102 Z" fill="#332C28" />
        <ellipse cx="46" cy="102" rx="11" ry="6" fill="#EAE5D9" transform="rotate(-14 46 102)" />

        {/* 身体 (棕褐 + 羽纹) */}
        <path
          d="M30 92 C 52 76, 96 68, 136 72 C 154 74, 166 82, 164 92 C 160 104, 128 112, 92 112 C 62 112, 40 104, 30 92 Z"
          fill="#B3865A"
        />
        <g stroke="#8F6A42" strokeWidth="1.6" fill="none" opacity="0.75">
          <path d="M60 84 C 80 78, 108 76, 130 80" />
          <path d="M56 94 C 80 88, 110 86, 136 90" />
          <path d="M64 104 C 86 98, 112 96, 132 100" />
        </g>

        {/* 脚 (橙色, 收于腹后) */}
        <path d="M56 110 C 50 115, 42 117, 35 116 C 41 110, 48 108, 56 110 Z" fill="#E0863F" />
        <path d="M70 112 C 64 117, 56 119, 49 118 C 55 112, 62 110, 70 112 Z" fill="#D67A34" />

        {/* 颈 + 头 (黑色长颈前伸, 白色颊斑) */}
        <path
          d="M138 78 C 150 72, 164 64, 176 56 C 184 50, 196 50, 202 57 C 208 64, 206 74, 198 79 C 188 85, 172 88, 158 92 C 150 94, 142 88, 138 82 Z"
          fill="#2E2A28"
        />
        <ellipse cx="194" cy="66" rx="7.2" ry="5.4" fill="#F2EFE8" transform="rotate(-18 194 66)" />
        <path d="M204 57 L217 62 L205 66 Z" fill="#1C1917" />

        {/* 近侧翅膀 (宽扇面, 羽尖展开, 扇翅) */}
        <g className="wing-near">
          <path
            d="M100 78
               C 98 52, 90 28, 64 10
               L 72 22 L 55 20 L 64 33 L 48 33 L 58 45 L 44 47 L 56 57
               C 68 66, 78 74, 84 84
               C 90 92, 100 88, 100 78 Z"
            fill="#3B322D"
          />
          <path
            d="M96 76 C 94 56, 86 38, 70 24 C 80 38, 88 56, 90 74 C 92 82, 97 82, 96 76 Z"
            fill="#9A7648"
            opacity="0.92"
          />
          <path d="M56 57 C 68 66, 78 74, 84 84" stroke="#E9E4DA" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  )
}

/** 扇贝云 (黄底 + 粉边错位), viewBox 600x170 */
function Cloud({ className, style, flip }: { className?: string; style?: React.CSSProperties; flip?: boolean }) {
  const d =
    'M14 132 ' +
    'A 30 30 0 0 1 66 116 ' +
    'A 36 36 0 0 1 128 108 ' +
    'A 30 30 0 0 1 180 116 ' +
    'A 42 42 0 0 1 252 102 ' +
    'A 30 30 0 0 1 306 114 ' +
    'A 27 27 0 0 1 352 110 ' +
    'A 38 38 0 0 1 420 106 ' +
    'A 29 29 0 0 1 470 116 ' +
    'A 33 33 0 0 1 536 110 ' +
    'A 27 27 0 0 1 584 126 ' +
    'Q 592 136 578 140 ' +
    'L 18 140 Z'
  return (
    <svg viewBox="0 0 600 170" className={`cloud-drift absolute ${className ?? ''}`} style={style} aria-hidden="true">
      <g transform={flip ? 'scale(-1,1) translate(-600,0)' : undefined}>
        <path d={d} transform="translate(9,11)" fill="#EFB09E" />
        <path d={d} fill="#F6EFAE" />
      </g>
    </svg>
  )
}

/** 5 只大雁编队: 参考图位置分布 (右上大 / 右侧远小 / 中右大 / 中下大 / 左下大) */
const FLOCK: GooseProps[] = [
  { size: 185, duration: 85, delay: -62, top: '13%' },
  { size: 118, duration: 100, delay: -30, top: '25%', far: true },
  { size: 175, duration: 92, delay: -76, top: '44%' },
  { size: 148, duration: 78, delay: -45, top: '56%' },
  { size: 168, duration: 96, delay: -12, top: '63%' },
]

export default function SkyScene() {
  return (
    <div
      aria-hidden="true"
      className="sky-gradient absolute inset-0 overflow-hidden opacity-100 transition-opacity duration-300 dark:opacity-40"
    >
      {/* 云朵后方深蓝色云层 (局部露出, 增加层次) */}
      <svg viewBox="0 0 600 150" className="absolute left-[18%] top-[47%] w-[95%]" aria-hidden="true">
        <path
          d="M18 100 A 34 34 0 0 1 86 90 A 42 42 0 0 1 170 86 A 34 34 0 0 1 240 88 A 46 46 0 0 1 332 82 A 36 36 0 0 1 404 88 A 30 30 0 0 1 470 92 A 38 38 0 0 1 548 100 A 32 32 0 0 1 500 116 A 38 38 0 0 1 430 124 A 30 30 0 0 1 362 120 A 40 40 0 0 1 282 126 A 30 30 0 0 1 214 122 A 34 34 0 0 1 142 124 A 28 28 0 0 1 76 118 A 26 26 0 0 1 18 100 Z"
          fill="#6E8FC5"
          opacity="0.45"
        />
      </svg>

      {/* 中部大云带 + 散落小云 */}
      <Cloud className="left-[-6%] top-[38%] w-[112%]" style={{ animationDuration: '16s' }} />
      <Cloud className="left-[2%] top-[55%] w-[72%]" flip style={{ animationDuration: '20s', animationDelay: '-6s' }} />
      <Cloud className="left-[5%] top-[27%] w-[13rem]" style={{ animationDuration: '13s' }} />
      <Cloud className="left-[26%] top-[33%] w-[9rem]" flip style={{ animationDuration: '15s', animationDelay: '-4s' }} />
      <Cloud className="right-[6%] top-[30%] w-[12rem]" style={{ animationDuration: '18s', animationDelay: '-9s' }} />

      {/* 大雁编队 */}
      {FLOCK.map((g, i) => (
        <Goose key={i} {...g} />
      ))}
    </div>
  )
}
