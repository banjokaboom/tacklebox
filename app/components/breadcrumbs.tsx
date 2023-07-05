'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Crumbs from '@/app/classes/Crumbs'

export default function Breadcrumbs({ links }: Crumbs) {
  const pathname = usePathname() || ''

  return (
    <div className="flex flex-row mb-6 lg:mb-8 text-sm">
      <Link href="/">Home</Link>
      {links &&
        links.map((link) => (
          <div className="flex flex-row" key={link.title}>
            <span className="inline-block ml-2">&gt;</span>
            {pathname == link.href && (
              <span className="inline-block ml-2">{link.title}</span>
            )}
            {pathname !== link.href && (
              <Link href={link.href} className="ml-2">
                {link.title}
              </Link>
            )}
          </div>
        ))}
    </div>
  )
}
