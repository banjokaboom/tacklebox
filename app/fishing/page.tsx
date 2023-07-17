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
        <div className="flex flex-col justify-between mb-4">
          <Link
            className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/can-i-fish"
          >
            Can I Fish
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
            What to Fish
          </Link>
        </div>

        <h2 className="text-2xl underline mb-4">Resources</h2>
        <p className="mb-4">
          The best websites for learning where, when, and how to fish.
        </p>
        <ul className="list-disc pl-6">
          <li>
            {' '}
            <Link
              className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
              target="_blank"
              href="https://www.takemefishing.org/"
            >
              Take Me Fishing
            </Link>
          </li>
          <li>
            <Link
              className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
              target="_blank"
              href="https://www.wired2fish.com/"
            >
              Wired2Fish
            </Link>
          </li>
          <li>
            <Link
              className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
              target="_blank"
              href="https://massachusettspaddler.com/"
            >
              Massachusetts Paddler
            </Link>
          </li>
          <li>
            <Link
              className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
              target="_blank"
              href="https://www.onthewater.com/regions/massachusetts"
            >
              On The Water
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
