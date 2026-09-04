// 简历数据 - 内容与 Figma 设计稿(Clean Editorial 风格)保持一致
// 修改此文件即可更新全站内容,无需改动组件代码

export interface Profile {
  name: string
  role: string
  badge: string
  headline: string
  intro: string
  heroTags: string[]
  heroTagHighlight: string
  email: string
  wechat?: string
}

export interface AboutCard {
  title: string
  description: string
}

export interface AboutInfo {
  lead: string
  heading: string
  body: string
  cards: AboutCard[]
  portrait: string
}

export interface ExperienceItem {
  period: string
  location: string
  role: string
  company: string
  points: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface ProjectItem {
  category: string
  name: string
  description: string
  details: string[]
  tech: string[]
  image: string
  link: string
}

export interface EducationInfo {
  school: string
  degree: string
  period: string
  description: string
}

export interface Credential {
  name: string
  description: string
}

export interface SocialAccount {
  title: string
  handle: string
  href: string
}

export const profile: Profile = {
  name: '吴雨娇',
  role: '运营',
  badge: '广州 / 全职',
  headline: '外企与大厂运营',
  intro:
    '你好，我是吴雨娇。我在德国生活过，有外企+大厂运营从业经历，主导过 AI 客服项目，实现全球 7×24 小时无时差服务。PMP 持证，擅长跨部门项目管理，英德双语，掌握 SQL/Excel 数据分析技能。',
  heroTags: [
    '产品运营',
    'AI 应用',
    '项目管理',
    'PMP',
    '商家运营',
    '数据分析',
    'SQL',
    'Excel',
    '知识体系搭建',
    '跨部门项目落地',
    '英语 6 级',
    '德语 B2',
  ],
  heroTagHighlight: '运营',
  email: 'chloe.yujiao.wu@foxmail.com',
}

export const about: AboutInfo = {
  lead: '将复杂的技术挑战转化为优雅、直观的工程解决方案。既能站在高处审视系统架构，也能潜入细节雕琢一行代码。',
  heading: '数据驱动+项目管理',
  body: '待填充',
  cards: [
    {
      title: '外企+互联网',
      description: '待补充',
    },
    {
      title: '项目管理',
      description: '待补充',
    },
  ],
  portrait: 'images/portrait.jpg',
}

export const experiences: ExperienceItem[] = [
  {
    period: '2023.09 - 2026.05',
    location: '杭州',
    role: '产品运营',
    company: '阿里巴巴 · 国际站 · 全球供应商发展部',
    points: [
      '产品运营：负责 GGS 发品产品全周期运营，涵盖文案配置（英文/繁体中文）、操作手册、培训答疑与功能优化，协同 UED/研发/AM 落地产品，提升商家体验。',
      '商家运营：配置 Push 与后台 Banner，策划奖励活动并监控商家核心指标，为达标商家提供流量倾斜等奖励，提升商家满意度与平台活跃度。',
      'AI 能力落地：独立统筹搭建 AI + 知识库 + Skills 钉钉答疑机器人，实现全球 AM 实时查询、异常自动诊断，消除时差延迟，服务满意度显著提升。',
      '知识沉淀与项目管理：编写 User Guide、视频教程与 FAQ，降低商家学习成本；主导商家活动全流程（策划-资源-排期-执行-复盘），保障高效落地。',
    ],
  },
  {
    period: '2020.04 - 2023.01',
    location: '杭州',
    role: '效率运营',
    company: '滴滴出行 · 车胜惠迪 · 运营中心',
    points: [
      '数据支持：设计开发数据提取工具及自动化报表系统，支持司机用车全流程数据监控，实现订单周期、账单应收/实收等核心数据次日可查，提升业务决策效率。',
      '业务分析：基于系统数据提炼核心业务洞察，制作月度经营分析报告，与财务、经管协作确认 toB/toC 应收实收，发起结算并分析业务波动原因。',
      '指标监控与数据治理：建立关键业务指标监控体系，通过日报月报跟踪目标达成并预警风险；复核业务逻辑快速定位系统 Bug（1 天内），推动技术团队改进，提升数据准确性。',
    ],
  },
  {
    period: '2017.03 - 2020.03',
    location: '杭州',
    role: '部门助理',
    company: '莱默尔（浙江）自动化控制技术 · 品管部',
    points: [
      '质量管理：主导质量问题分析，撰写纠正预防措施报告（8D 报告），跨部门协作跟踪问题改善，制作分析报告（PPT）分发各部门，推动质量提升。',
      '供应商管理：统计采购件不合格率，建立供应商 KPI 考核体系，实施分级分类管理，降低采购风险。',
      '中国区质量项目管理：作为中国区质量项目负责人，收集并分析中国市场批量性质量问题，与德国母公司及全球子公司品管团队协作制定解决方案，提升产品质量与客户满意度。',
    ],
  },
  {
    period: '2015.08 - 2017.02',
    location: '杭州',
    role: '外贸专员',
    company: '威尚进出口贸易公司',
    points: [
      '客户开发与维护：负责新客户开发及老客户关系维护，制作报价单并跟进订单执行，提升客户满意度与复购率。',
      '供应商管理：开发新供应商，发送询盘并协商议价，优化供应链成本与效率，支持业务增长。',
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    category: '语言能力',
    items: ['英语 6 级（持证）', '德语 B2（德国本土系统课程）', '跨境沟通能力'],
  },
  {
    category: '专业技能',
    items: ['PMP 项目管理', 'SQL 数据查询', 'Excel 高级函数和透视表', 'Thinkcell', 'Canva 和剪映'],
  },
  {
    category: '核心能力',
    items: ['产品运营', 'AI 应用', '项目管理', '商家运营', '数据监控与分析', '知识体系搭建', '跨部门项目落地'],
  },
]

export const projects: ProjectItem[] = [
  {
    category: 'AI 应用',
    name: 'AI Agent 客服',
    description:
      '基于钉钉与千问，实现智能客服机器人，提升客户满意度与服务效率。',
    details: [
      '独立统筹搭建 AI + 知识库 + Skills 钉钉答疑机器人，实现全球 AM 实时查询、异常自动诊断。',
      '消除时差延迟，全球 7×24 小时无时差服务，服务满意度显著提升。',
      '整合知识库与 Skills 能力，实现智能问答与自动诊断的闭环。',
    ],
    tech: ['钉钉', '千问'],
    image: 'images/project-ai.jpg',
    link: '#projects',
  },
  {
    category: '数据',
    name: '车辆标签监控',
    description:
      '对接业务部门数据需求，设计并开发数据提取工具及自动化报表系统，支持司机用车全流程数据监控。',
    details: [
      '设计并开发数据提取工具及自动化报表系统，支持司机用车全流程数据监控与分析。',
      '实现订单周期、账单应收/实收等核心数据的次日可查，提升业务决策效率。',
      '基于系统数据制作月度经营分析报告，与财务、经管部门协作确认 toB/toC 应收实收数据。',
      '建立关键业务指标监控体系，通过日报、月报形式跟踪目标达成情况，及时预警潜在风险。',
    ],
    tech: ['SQL', 'Excel', '自动化报表'],
    image: 'images/project-dashboard.jpg',
    link: '#projects',
  },
]

export const education: EducationInfo = {
  school: '湖北文理学院',
  degree: '国际经济与贸易 · 统招本科 · 学士',
  period: '2009.09 - 2015.07',
  description:
    '曾在德国斯图加特学习德语，为期两年',
}

export const credentials: Credential[] = []


export const socials: SocialAccount[] = [
  {
    title: 'GitHub 个人主页',
    handle: '@github.com/mingyuan-zhang',
    href: 'https://github.com/mingyuan-zhang',
  }
]

export const contact = {
  heading: '联系我',
  description:
    '发邮件吧',
  socialTitle: '个人邮箱',
}

export const footerMeta = {
  credit: '简洁，专业，高效',
}
