import Link from 'next/link'
import Breadcrumbs from '../components/breadcrumbs'

export default function Fishing() {
  let breadcrumbs = [
    {
      title: 'Fishing',
      href: '/fishing',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Fishing</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          This is a list of apps I have developed to help fishermen.
        </p>
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <Link
            className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/can-i-fish"
          >
            Can I Fish (MA)
          </Link>
          <Link
            className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/tackle-by-species"
          >
            Tackle by Species
          </Link>
          <Link
            className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/what-to-fish"
          >
            What to Fish (Freshwater)
          </Link>
          <Link
            className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/what-to-fish-salt"
          >
            What to Fish (Saltwater)
          </Link>
        </div>
      </div>
    </div>
  )
}
