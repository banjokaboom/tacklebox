import Link from 'next/link'
import Breadcrumbs from '../components/breadcrumbs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'

export default function Personal() {
  let breadcrumbs = [
    {
      title: 'Personal',
      href: '/personal',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Personal</h1>
        <hr className="mb-4" />

        <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-around items-center">
          <Link
            className="w-full lg:basis-3/12 shrink-0 mb-4 lg:mb-0 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
            href="/personal/what-to-make"
          >
            <FontAwesomeIcon icon={faUtensils} className="mb-4 h-16" />
            <span>What to Make for Dinner</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
