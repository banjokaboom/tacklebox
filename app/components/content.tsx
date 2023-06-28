import { ReactNode } from 'react'

interface Props {
  title?: string
  subtitle?: string
  content: ReactNode
}

export default function ContentSection({ title, subtitle, content }: Props) {
  return (
    <div>
      {title && <h2 className="text-2xl pb-8 pt-8">{title}</h2>}
      {subtitle && <h3 className="pb-4 text-xl">{subtitle}</h3>}
      {content && (
        <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
          <div>{content}</div>
        </div>
      )}
    </div>
  )
}
