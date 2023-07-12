'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFishFins } from '@fortawesome/free-solid-svg-icons'
import Menu from './menu'

export default function Header() {
  let isTimeoutSet = false
  let [isCaught, setIsCaught] = useState(false)
  let [isHidden, setIsHidden] = useState(true)

  function toggleCaught() {
    setIsCaught(!isCaught)
    setIsHidden(false)

    if (!isTimeoutSet) {
      isTimeoutSet = true
      setTimeout(() => {
        isTimeoutSet = false
        setIsHidden(true)
      }, 10000)
    }
  }

  let className = ''

  if (!isHidden) {
    className = 'opacity-100 w-fit'
  } else {
    className = 'opacity-0 w-0'
  }

  return (
    <header className="flex flex-col items-center justify-between p-12 lg:p-24 lg:pt-12 lg:pb-12 bg-slate-50 mx-auto text-slate-700 relative">
      <div className="max-w-5xl w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <Link href="/" className="text-3xl flex flex-col">
                Tacklebox
              </Link>
              <FontAwesomeIcon
                icon={faFishFins}
                className="max-h-8 h-8 ml-4 hover:-rotate-90 transition-transform"
                onMouseEnter={toggleCaught}
                onMouseLeave={toggleCaught}
              />
              <span
                className={
                  'text-sm ml-2 transition-all hidden lg:inline-block ' +
                  className
                }
              >
                {isCaught ? 'caught!' : 'released!'}
              </span>
            </div>
            <span className="text-xs">an app by beardedfishapps</span>
          </div>
          <Menu />
        </div>
      </div>
    </header>
  )
}
