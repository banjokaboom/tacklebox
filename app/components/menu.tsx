'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Menu() {
  let [isExpanded, setIsExpanded] = useState(false)

  let className =
    'p-4 flex flex-col text-slate-700 bg-slate-50 rounded-md shadow items-end transition-all overflow-hidden absolute right-12 sm:right-0 sm:-left-52 left-12'
  className += isExpanded ? ' opacity-100' : ' h-0 pt-0 pb-0 opacity-0'

  const icon = isExpanded ? faXmark : faBars

  return (
    <nav className="sm:relative">
      <button
        title="Header Menu"
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
      >
        <FontAwesomeIcon icon={icon} className="max-h-8 h-8" />
      </button>
      <div className={className}>
        <Link
          className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
          href="/"
          onClick={() => {
            setIsExpanded(false)
          }}
        >
          Home
        </Link>
        <Link
          className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
          href="/fishing"
          onClick={() => {
            setIsExpanded(false)
          }}
        >
          Fishing
        </Link>
        <Link
          className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
          href="/home-maintenance"
          onClick={() => {
            setIsExpanded(false)
          }}
        >
          Home Maintenance
        </Link>
        <Link
          className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
          href="/personal"
          onClick={() => {
            setIsExpanded(false)
          }}
        >
          Personal
        </Link>
        <Link
          className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
          href="/about"
          onClick={() => {
            setIsExpanded(false)
          }}
        >
          About
        </Link>
        <Link
          className="w-fit underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
          href="/changelog"
          onClick={() => {
            setIsExpanded(false)
          }}
        >
          Changelog
        </Link>
      </div>
    </nav>
  )
}
