# 参照 vidu.cn 架构重构简历网站

## Context
用户要求参照 vidu.cn 官网的架构风格改版简历网站（vidu 首屏特征：居中大标题 Hero → 内容大区块交替布局 → 深色 CTA 区）。
已与用户确认三项决策：
1. **Hero 改 vidu 式居中布局**：badge、大标题、intro、CTA 全部居中，TagSpiral 黑卡居中放在标题下方
2. **项目展示改 vidu 式全宽交替大卡片**：每个项目占满一行，图片左右交替，点击仍打开详情弹窗
3. **不新增**「核心能力四小卡」区块

其余区块（About / Experience / Skills / Education / Contact / Footer / Navbar / SideNav）与区块顺序**保持不变**，只做上述两处结构性改造。`src/data/resume.ts` 无需改动。

## 修改文件（共 2 个）

### 1. `src/components/Hero.tsx` — 居中式重构
现状：`grid grid-cols-[1fr_1fr]` 左文右卡双栏。
改造为居中单列：
- 外层容器：`container-content flex min-h-[92vh] flex-col items-center justify-center pb-20 pt-32 text-center`
- badge「广州 / 全职」保持现有样式，居中
- h1 大标题「外企与大厂运营」：保留 `text-[clamp(2.5rem,8vw,6.5rem)] font-black` 与 `whitespace-nowrap`，居中
- intro 段落：**保留现有的「吴雨娇」split 纯黑加粗渲染逻辑**（`intro.split('吴雨娇')` + `font-bold text-black` span），加 `max-w-2xl` 居中
- CTA 双按钮容器：`flex flex-wrap items-center justify-center gap-4`，按钮样式不变
- TagSpiral：从右栏移到下方，包一层 `<div className="mt-14 w-full max-w-xl">`。
  TagSpiral 根元素自带 `relative h-full min-h-[60vh] overflow-hidden rounded-[2rem] bg-[#0d0d10]`，内部 ResizeObserver + useMemo 依赖 size 自适应，圆角裁切安全边界按实测 w/h 计算，**组件内部零改动**。

### 2. `src/components/Projects.tsx` — 全宽交替大卡片
现状：`grid grid-cols-2 gap-8` 两列卡片。
改造为 vidu 式全宽大区块：
- 外层：`mt-16 grid grid-cols-2 gap-8` → `mt-16 space-y-10 lg:space-y-16`
- 每个项目卡片：`group surface-card grid cursor-pointer overflow-hidden transition-shadow hover:shadow-lg lg:grid-cols-2`
  - 图片列：`overflow-hidden`，当 `idx % 2 === 1` 时加 `lg:order-2` 实现左右交替；移动端图片在上
  - 图片：`aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full` + 保留 `group-hover:scale-[1.03]`
  - 文字列：`flex flex-1 flex-col justify-center p-8 lg:p-14`
    - category：`label text-accent`（保留）
    - 标题：升级为 `heading-2` 基础上加 `lg:text-4xl`（vidu 大区块的大标题风）
    - description、tech 标签、「细节」链接：保留现有样式
- **弹窗（modal）逻辑、ESC 关闭、body overflow 锁定全部保留不动**

## 不改的部分
- Navbar / SideNav：锚点 id 全部不变（about/experience/skills/projects/education/contact），无需更新
- Experience 筛选与时间线、Skills、Education、Contact、Footer、TagSpiral 内部逻辑
- 区块顺序：Hero → About → Experience → Skills → Projects → Education → Contact

## 验证
1. `npx tsc --noEmit` 类型检查
2. dev server `http://localhost:5174/my_cv_online/` 浏览器验证：
   - Hero 居中：badge / 标题 / intro（含「吴雨娇」纯黑加粗）/ CTA / TagSpiral 全部水平居中
   - TagSpiral 在 max-w-xl 新容器内：聚合态圆环正常渲染；悬停后标签聚合无圆角裁切（≤0.5px）、无重叠（复用此前 `data-tag` 测量脚本）
   - 项目区：两个项目图片左右交替；点击打开详情弹窗、ESC 可关闭
   - 亮/暗色模式切换正常；模拟 375px 窄屏不破版（标题单行、项目卡片纵向堆叠）
3. 用户确认效果后构建部署（npm run build → push main → dist force push gh-pages）
