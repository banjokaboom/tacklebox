'use client'

import { usePathname, redirect } from 'next/navigation'

export default function Home() {
  const pathname = usePathname() || ''

  console.log(pathname)

  if (pathname.includes('pages')) {
    redirect(pathname.replace('pages/', ''))
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">404 Not Found</h1>
      </div>
    </div>
  )
}
