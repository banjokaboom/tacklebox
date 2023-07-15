'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { faTree, faMugHot } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const pathname = usePathname() || ''

  return (
    <footer className="p-12 lg:p-24 lg:pt-16 lg:pb-16 bg-cyan-700 mx-auto">
      <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-between items-start border-t pt-8">
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <Link
            className="mb-4 w-fit hover:tracking-wide transition-[letter-spacing]"
            href="/"
          >
            {pathname == '/' ? '> ' : ''}Home
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing]"
            href="/fishing"
          >
            {pathname == '/fishing' ? '> ' : ''}Fishing
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/can-i-fish"
          >
            {pathname.includes('can-i-fish') ? '> ' : ''}Can I Fish (MA)
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/tackle-by-species"
          >
            {pathname.includes('tackle-by-species') ? '> ' : ''}Tackle by
            Species
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing]"
            href="/fishing/what-to-fish"
          >
            {pathname.includes('what-to-fish') && !pathname.includes('salt')
              ? '> '
              : ''}
            What to Fish (Freshwater)
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] mb-4"
            href="/fishing/what-to-fish-salt"
          >
            {pathname.includes('what-to-fish-salt') ? '> ' : ''}What to Fish
            (Saltwater)
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] mb-4"
            href="/home-maintenance"
          >
            {pathname == '/home-maintenance' ? '> ' : ''}Home Maintenance
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] lg:mb-4"
            href="/personal"
          >
            {pathname.includes('personal') ? '> ' : ''}Personal
          </Link>
        </div>
        <div className="flex flex-col justify-between lg:mb-0 mb-4 lg:basis-4/12 lg:shrink-0">
          <h4 className="text-lg mb-4 underline">Info</h4>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing]"
            href="/about"
          >
            {pathname.includes('about') ? '> ' : ''}About
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] mb-4"
            href="/changelog"
          >
            {pathname.includes('changelog') ? '> ' : ''}Changelog
          </Link>
          <h4 className="text-lg mb-4 underline">Social</h4>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] flex flex-row items-center"
            title="Ko-fi Donate Link"
            href="https://ko-fi.com/banjokaboom"
            target="_blank"
          >
            <span>Buy me coffee </span>
            <FontAwesomeIcon icon={faMugHot} className="max-h-5 h-5 ml-2" />
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing]"
            href="mailto:tackleboxappfeedback@gmail.com?subject=Tacklebox%20Feedback"
          >
            Contact
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] flex flex-row items-center"
            title="Paypal Donate Link"
            href="https://www.paypal.com/donate/?hosted_button_id=BUNJWE5436NXN"
            target="_blank"
          >
            <span>Donate </span>
            <FontAwesomeIcon icon={faPaypal} className="max-h-5 h-5 ml-2" />
          </Link>
          <Link
            className="w-fit hover:tracking-wide transition-[letter-spacing] flex flex-row items-center"
            title="Linktree Social Link"
            href="https://linktr.ee/augustoandrew"
            target="_blank"
          >
            <span>Linktree </span>
            <FontAwesomeIcon icon={faTree} className="max-h-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
      <div className="pt-24 mx-auto max-w-5xl text-right hidden">
        <p className="text-xs">{process.env.NODE_ENV}</p>
      </div>
    </footer>
  )
}
