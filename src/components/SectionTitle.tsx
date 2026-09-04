interface SectionTitleProps {
  eyebrow: string
  title: string
  /** 分隔线下方右侧的引言文字 */
  lead?: string
}

export default function SectionTitle({ eyebrow, title, lead }: SectionTitleProps) {
  return (
    <div>
      <p className="section-eyebrow">
        <span className="inline-block h-3 w-3 flex-none bg-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="section-title mt-5">{title}</h2>
      <div className="mt-10 border-b border-line" />
      {lead && (
        <div className="mt-12 flex justify-end">
          <p className="body-lg max-w-xl text-lg sm:text-xl">{lead}</p>
        </div>
      )}
    </div>
  )
}
