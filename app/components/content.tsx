export default function ContentSection({ title, content }) {
  return (
    <div>
      <h2 className="text-2xl pb-8 pt-8">{title}</h2>
      <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
        <p>{content}</p>
      </div>
    </div>
  )
}
