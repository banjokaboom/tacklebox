import Link from 'next/link'

export default function Personal() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">Personal</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          This is a list of apps I have developed for personal use.
        </p>
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <Link
            className="w-fit underline hover:no-underline"
            href="/personal/what-to-make"
          >
            What to Make for Dinner
          </Link>
        </div>
      </div>
    </div>
  )
}
