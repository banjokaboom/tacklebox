'use client'

import { usePathname, redirect } from 'next/navigation'

export default function Home() {
  const pathname = usePathname() || ''

  try {
    if (pathname.includes('pages')) {
      redirect(pathname.replace('pages/', ''))
    }
  } catch (e) {
    console.error(e)
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">404 Not Found</h1>
        <hr className="mb-4" />
        <p>
          The fish you are looking for either doesn&apos;t exist or moved.
          Double check your sonar settings or click one of the links below.
        </p>
      </div>
    </div>
  )
}
