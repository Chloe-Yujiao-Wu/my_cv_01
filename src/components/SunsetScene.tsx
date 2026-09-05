/**
 * Hero 第一屏场景: 暮色山丘 + 白裙短发舞者
 * 参考图: 紫粉暮色渐变天空 + 右侧暖光与彩虹 + 粉红山丘 + 人物点状描边
 * 女孩手臂从左到右优雅挥动 (CSS 动画, 见 index.css)
 * 鼠标横向滑动时 (progress 0→1), 简历标题沿山脊与人物描边从左到右浮现
 */

import { profile } from '../data/resume'

interface SunsetSceneProps {
  /** 鼠标在首屏的横向进度 0-1, 控制描边标题的显现范围 */
  progress: number
}

/** 右侧大山山脊线 (左→右下行) */
const RIDGE_RIGHT = 'M 700 312 C 850 382 1000 472 1160 532 C 1272 572 1372 602 1462 622'
/** 左侧山丘山脊线 (左→右) */
const RIDGE_LEFT = 'M -22 622 C 80 562 180 504 300 474 C 420 444 520 484 620 564 C 690 618 750 670 812 716'
/** 人物描边: 裙摆左侧→腰身→肩→右裙摆 (供文字沿轮廓流动) */
const DRESS_LINE =
  'M 560 788 C 556 700 566 560 596 462 C 612 410 630 366 648 336 C 664 328 690 328 706 336 C 740 420 768 540 788 650 C 796 700 800 748 800 788'

/** 描边标题文案: 简历标题 + 姓名, 重复铺满路径 */
const flowText = Array(3).fill(`${profile.headline} · ${profile.name}`).join(' · · ')

export default function SunsetScene({ progress }: SunsetSceneProps) {
  const revealX = (Math.min(1, Math.max(0, progress)) - 1) * 1470

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 810"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* 暮色天空: 紫罗兰 → 粉 → 蜜桃 */}
          <linearGradient id="dusk-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#877FB4" />
            <stop offset="30%" stopColor="#9C8BC2" />
            <stop offset="55%" stopColor="#BC93B8" />
            <stop offset="78%" stopColor="#DAA296" />
            <stop offset="100%" stopColor="#E9AD90" />
          </linearGradient>
          {/* 暖光光晕 */}
          <radialGradient id="dusk-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFE0B6" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#FFD9B4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFD9B4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dusk-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2DC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFF2DC" stopOpacity="0" />
          </radialGradient>
          {/* 右侧彩虹棱镜光带 */}
          <linearGradient id="dusk-rainbow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#EF7E8E" stopOpacity="0" />
            <stop offset="18%" stopColor="#EF7E8E" />
            <stop offset="32%" stopColor="#F2A66A" />
            <stop offset="46%" stopColor="#F2D06A" />
            <stop offset="60%" stopColor="#9BCB9B" />
            <stop offset="74%" stopColor="#86A8DC" />
            <stop offset="88%" stopColor="#B08FD8" />
            <stop offset="100%" stopColor="#B08FD8" stopOpacity="0" />
          </linearGradient>
          {/* 右侧大山 */}
          <linearGradient id="mount-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C06688" />
            <stop offset="100%" stopColor="#8E4C6E" />
          </linearGradient>
          {/* 左侧山丘 */}
          <linearGradient id="mount-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C95F74" />
            <stop offset="100%" stopColor="#A84A62" />
          </linearGradient>
          {/* 裙摆暖光 */}
          <linearGradient id="dress-warm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFE6CB" stopOpacity="0" />
            <stop offset="100%" stopColor="#FFE6CB" stopOpacity="0.55" />
          </linearGradient>
          <filter id="soft-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          {/* 鼠标进度揭示框: 从左到右展开 */}
          <clipPath id="outline-reveal">
            <rect
              x="-10"
              y="-10"
              width="1470"
              height="830"
              style={{
                transform: `translateX(${revealX}px)`,
                transition: 'transform 200ms ease-out',
                willChange: 'transform',
              }}
            />
          </clipPath>
          {/* 描边文字路径 */}
          <path id="path-ridge-right" d={RIDGE_RIGHT} />
          <path id="path-ridge-left" d={RIDGE_LEFT} />
          <path id="path-dress" d={DRESS_LINE} />
        </defs>

        {/* ===== 天空 ===== */}
        <rect x="0" y="0" width="1440" height="810" fill="url(#dusk-sky)" />

        {/* 暖光 + 夕阳光核 (人物右后方) */}
        <circle cx="880" cy="410" r="330" fill="url(#dusk-glow)" />
        <circle cx="905" cy="398" r="88" fill="url(#dusk-sun)" />

        {/* ===== 右侧大山 (山脊 dotted 描边) ===== */}
        <path
          d="M 640 812 L 700 312 C 850 382 1000 472 1160 532 C 1272 572 1372 602 1462 622 L 1462 812 Z"
          fill="url(#mount-right)"
        />
        {/* 山脊受光面 */}
        <path
          d="M 700 312 C 850 382 1000 472 1160 532 C 1272 572 1372 602 1462 622 L 1462 680 C 1330 650 1180 600 1020 528 C 880 464 770 386 700 312 Z"
          fill="#D77A92"
          opacity="0.35"
        />
        {/* 彩虹棱镜光带 (覆在山坡上) */}
        <rect
          x="1020"
          y="430"
          width="400"
          height="380"
          fill="url(#dusk-rainbow)"
          opacity="0.38"
          filter="url(#soft-blur)"
        />
        {/* 右山脊 dotted 描边 */}
        <path
          d={RIDGE_RIGHT}
          fill="none"
          stroke="#F6DCE4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.1 10"
          opacity="0.95"
        />

        {/* ===== 左侧远丘 ===== */}
        <path
          d="M -22 700 C 60 662 140 660 220 696 C 262 714 302 732 344 746 L 344 812 L -22 812 Z"
          fill="#9C5478"
          opacity="0.7"
        />

        {/* ===== 左侧山丘 ===== */}
        <path
          d="M -22 812 L -22 622 C 80 562 180 504 300 474 C 420 444 520 484 620 564 C 690 618 750 670 812 716 L 812 812 Z"
          fill="url(#mount-left)"
        />
        <path
          d={RIDGE_LEFT}
          fill="none"
          stroke="#F6DCE4"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="0.1 10"
          opacity="0.95"
        />

        {/* ===== 短发女孩 (背面视角, 看不见长相, 站在山丘前) ===== */}
        <g className="dancer-sway">
          {/* 颈部与肩头肤色 */}
          <path
            d="M 667 295 C 667 303 666 310 664 315 C 671 319 681 319 688 315 C 685 309 684 302 684 294 C 679 297 672 297 667 295 Z"
            fill="#F0C3AB"
          />
          <path
            d="M 634 346 C 636 324 652 310 676 310 C 700 310 716 324 718 346 C 700 338 652 338 634 346 Z"
            fill="#F0C3AB"
          />

          {/* 连衣裙: 上身 */}
          <path
            d="M 642 344 C 660 336 692 336 710 344 C 714 372 712 398 704 420 C 688 428 664 428 648 420 C 640 398 638 372 642 344 Z"
            fill="#FBF7F3"
          />
          {/* 连衣裙: 大裙摆 (下摆随波流动) */}
          <path
            d="M 648 418 C 616 472 590 556 572 646 C 561 694 556 742 558 790 C 576 784 592 792 610 786 C 630 780 646 790 666 784 C 686 778 702 788 722 782 C 742 776 758 786 776 780 C 792 776 804 782 812 786 C 814 738 808 682 794 624 C 778 558 756 496 720 444 C 706 424 692 414 678 416 C 668 417 656 417 648 418 Z"
            fill="#FBF7F3"
          />
          {/* 裙摆右侧暖光 (夕阳方向) */}
          <path
            d="M 678 416 C 692 414 706 424 720 444 C 756 496 778 558 794 624 C 808 682 814 738 812 786 C 804 782 792 776 776 780 C 758 786 742 776 722 782 C 714 784 706 784 698 782 C 690 700 680 560 672 452 C 674 438 676 424 678 416 Z"
            fill="url(#dress-warm)"
          />
          {/* 裙摆褶皱 */}
          <g stroke="#D9CDE5" strokeWidth="2.2" fill="none" opacity="0.65" strokeLinecap="round">
            <path d="M 664 444 C 646 524 634 612 628 700" />
            <path d="M 690 440 C 692 524 696 614 700 706" />
            <path d="M 712 452 C 728 532 740 622 746 710" />
          </g>
          {/* 裙摆 dotted 描边 */}
          <path
            d="M 648 418 C 616 472 590 556 572 646 C 561 694 556 742 558 790 C 576 784 592 792 610 786 C 630 780 646 790 666 784 C 686 778 702 788 722 782 C 742 776 758 786 776 780 C 792 776 804 782 812 786 C 814 738 808 682 794 624 C 778 558 756 496 720 444 C 706 424 692 414 678 416 C 668 417 656 417 648 418 Z"
            fill="none"
            stroke="#D98BA4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.1 9"
            opacity="0.9"
          />
          {/* 左臂 (自然垂于裙侧, 静态) */}
          <path
            d="M 710 330 C 726 344 740 366 748 392 C 754 412 756 430 752 446 C 750 454 742 456 736 452 C 730 448 730 440 732 432 C 734 414 728 392 716 370 C 709 357 702 344 698 336 C 702 331 706 329 710 330 Z"
            fill="#F0C3AB"
            stroke="#D98BA4"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="0.1 9"
          />

          {/* 短发 (背面, 波波头, 微倾) */}
          <g transform="rotate(5 676 250)">
            <path
              d="M 651 264 C 644 242 646 220 659 210 C 672 200 690 202 699 214 C 708 226 708 244 703 261 C 700 272 695 281 689 286 C 683 291 675 293 668 292 C 660 291 654 287 652 281 C 649 276 649 270 651 264 Z"
              fill="#47323F"
            />
            <path
              d="M 651 264 C 644 242 646 220 659 210 C 672 200 690 202 699 214 C 708 226 708 244 703 261 C 700 272 695 281 689 286 C 683 291 675 293 668 292 C 660 291 654 287 652 281 C 649 276 649 270 651 264 Z"
              fill="none"
              stroke="#E8C8D4"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="0.1 9"
              opacity="0.85"
            />
            {/* 发丝高光 */}
            <path d="M 666 212 C 678 208 690 215 696 228" stroke="#6B4E5A" strokeWidth="2.2" fill="none" opacity="0.7" strokeLinecap="round" />
          </g>

          {/* 右臂: 大臂抬起 (肩部为轴, 缓慢摆动) */}
          <g className="arm-lift">
            <path
              d="M 634 342 C 622 316 612 289 607 265 C 605 257 609 251 616 250 C 623 249 628 254 630 262 C 636 284 645 309 657 329 C 652 337 641 344 634 342 Z"
              fill="#F0C3AB"
              stroke="#D98BA4"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeDasharray="0.1 9"
            />
            {/* 右臂: 小臂与手 (肘部为轴, 左→右优雅挥动) */}
            <g className="arm-wave">
              <path
                d="M 606 266 C 602 244 606 220 616 200 C 622 188 630 180 638 182 C 646 184 648 192 644 202 C 636 220 630 242 630 262 C 622 267 612 269 606 266 Z"
                fill="#F0C3AB"
              />
              {/* 手 (掌 + 三根舒展手指) */}
              <g fill="#F0C3AB">
                <path d="M 626 202 C 623 192 626 182 634 177 C 641 173 650 174 654 180 C 658 186 656 194 650 199 C 644 204 632 208 626 202 Z" />
                <path d="M 634 178 C 631 170 631 162 634 156 C 635 153 639 153 640 156 C 642 162 641 170 639 177 Z" />
                <path d="M 641 177 C 640 169 641 161 644 155 C 645 152 649 153 650 156 C 651 162 650 170 648 177 Z" />
                <path d="M 647 179 C 648 172 651 165 655 161 C 657 159 660 161 659 164 C 658 169 655 176 652 181 Z" />
              </g>
              <path
                d="M 606 266 C 602 244 606 220 616 200 C 622 188 630 180 638 182 C 646 184 648 192 644 202 C 636 220 630 242 630 262 C 622 267 612 269 606 266 Z"
                fill="none"
                stroke="#D98BA4"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="0.1 9"
              />
            </g>
          </g>
        </g>

        {/* ===== 描边浮现的简历标题 (鼠标从左到右滑动时显现) ===== */}
        <g clipPath="url(#outline-reveal)">
          <text fontSize="15" fontWeight="600" letterSpacing="4" fill="#F8E6ED" opacity="0.92">
            <textPath href="#path-ridge-right" startOffset="8">
              {flowText}
            </textPath>
          </text>
          <text fontSize="15" fontWeight="600" letterSpacing="4" fill="#F8E6ED" opacity="0.92">
            <textPath href="#path-ridge-left" startOffset="4">
              {flowText}
            </textPath>
          </text>
          <text fontSize="14" fontWeight="600" letterSpacing="4" fill="#C4708E" opacity="0.9">
            <textPath href="#path-dress" startOffset="6">
              {flowText}
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  )
}
