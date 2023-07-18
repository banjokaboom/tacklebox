import Link from 'next/link'
import Breadcrumbs from '../components/breadcrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faThumbsUp,
  faFish,
  faToolbox,
} from '@fortawesome/free-solid-svg-icons'

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

        <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-around items-center">
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/fishing/can-i-fish"
          >
            <FontAwesomeIcon icon={faThumbsUp} className="mb-4 h-16" />
            <span>Can I Fish</span>
          </Link>
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/fishing/tackle-by-species"
          >
            <FontAwesomeIcon icon={faFish} className="mb-4 h-16" />
            <span>Tackle by Species</span>
          </Link>
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/fishing/what-to-fish"
          >
            <FontAwesomeIcon icon={faToolbox} className="mb-4 h-16" />
            <span>What to Fish</span>
          </Link>
        </div>

        <h2 className="text-2xl underline mb-4">
          Beginner Tips - Keep it simple
        </h2>
        <p className="mb-4">
          The most challenging thing as a beginner fisherman for me was
          absorbing the abundance of information I received from people and
          online resources. What kept me sane in my first year of fishing was
          this simple concept - keep it simple.
        </p>
        <p className="mb-4">
          Instead of changing hook sizes frequently, using different hook types,
          collecting dozens of different colors of lures, and learning several
          different knots, I limited myself to a handful of techniques to start
          out.
        </p>
        <p className="mb-4">
          For starters, learn the palomar knot. It will cover most situations
          and is extremely dependable, not to mention it is easy to tie. Once
          you master that, work on the improved clinch knot.
        </p>
        <p className="mb-4">
          As far as hook sizes go, stick to #6 for trout and small fish, #1 for
          bigger sunfish and small bass, and 2/0 for larger bass. I usually use
          2/0 when wacky rigging, but #1 when drop shotting. One thing to note
          is that different manufacturers sometimes vary in their hook size
          numbering, especially if you are buying off of Amazon.
        </p>
        <p className="mb-4">
          When it comes to mono vs fluoro vs braid, keep it simple - stick to
          mono unless you really need something strong. Once you master
          techniques, you can switch it up. A simple setup with 8 or 10lb mono
          will go a long way. When you get the urge to try out braid, go with a
          20lb low-vis green. It will cover most situations, and you can get
          away with not using a leader as you learn different techniques.
        </p>
        <p className="mb-4">
          The most important advice any angler can give a fishing newbie is
          experience is everything. The more time you spend on the water, the
          more you will learn. Keep a log or a journal of some kind to keep
          track of what worked, what didn&apos;t, and you will be a better
          fisherman for it.
        </p>

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
