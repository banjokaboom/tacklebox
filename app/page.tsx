import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faHouseUser } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">Home</h1>
        <hr className="mb-4" />

        <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-around items-center">
          <Link
            className="w-full lg:basis-4/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/fishing"
          >
            <FontAwesomeIcon icon={faToolbox} className="mb-4 h-16" />
            <span>Fishing</span>
          </Link>
          <Link
            className="w-full lg:basis-4/12 shrink-0 mb-4 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/home-maintenance"
          >
            <FontAwesomeIcon icon={faHouseUser} className="mb-4 h-16" />
            <span>Home Maintenance</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
