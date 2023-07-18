import Link from 'next/link'
import Breadcrumbs from '../components/breadcrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFireFlameSimple,
  faTractor,
  faLadderWater,
} from '@fortawesome/free-solid-svg-icons'

export default function HomeMaintenance() {
  let breadcrumbs = [
    {
      title: 'Home Maintenance',
      href: '/home-maintenance',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Home Maintenance</h1>
        <hr className="mb-4" />
        <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-around items-center">
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/home-maintenance/oil-prices"
          >
            <FontAwesomeIcon icon={faFireFlameSimple} className="mb-4 h-16" />
            <span>Heating Oil Prices (MA)</span>
          </Link>
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/home-maintenance/lawn-care"
          >
            <FontAwesomeIcon icon={faTractor} className="mb-4 h-16" />
            <span>Lawn Care</span>
          </Link>
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/home-maintenance/pool-care"
          >
            <FontAwesomeIcon icon={faLadderWater} className="mb-4 h-16" />
            <span>Pool Care</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
