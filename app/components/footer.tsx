'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faRedditAlien,
  faPaypal,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'
import { faTree, faMugHot } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const pathname = usePathname() || ''

  return (
    <footer className="p-12 lg:p-24 lg:pt-16 lg:pb-16 bg-cyan-700 mx-auto">
      <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-between items-start border-t pt-8">
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <Link className="mb-4 w-fit" href="/">
            {pathname == '/' ? '> ' : ''}Home
          </Link>
          <h4 className="text-lg mb-4 underline">Fishing</h4>
          <Link className="w-fit" href="/can-i-fish">
            {pathname.includes('can-i-fish') ? '> ' : ''}Can I Fish (MA)
          </Link>
          <Link className="w-fit mb-4" href="/what-to-fish">
            {pathname.includes('what-to-fish') ? '> ' : ''}What to Fish
            (Freshwater)
          </Link>
          <h4 className="text-lg mb-4 underline">Home Maintenance</h4>
          <Link className="w-fit mb-4" href="/oil-prices">
            {pathname.includes('oil-prices') ? '> ' : ''}Heating Oil Prices (MA)
          </Link>
          <h4 className="text-lg mb-4 underline">Personal</h4>
          <Link className="w-fit lg:mb-4" href="/what-to-make">
            {pathname.includes('what-to-make') ? '> ' : ''}What to Make for
            Dinner
          </Link>
        </div>
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <h4 className="text-lg mb-4 underline">Info</h4>
          <Link className="w-fit" href="/about">
            {pathname.includes('about') ? '> ' : ''}About
          </Link>
          <Link className="w-fit mb-4" href="/changelog">
            {pathname.includes('changelog') ? '> ' : ''}Changelog
          </Link>
          <h4 className="text-lg mb-4 underline">Social</h4>
          <Link
            className="w-fit"
            href="mailto:tackleboxappfeedback@gmail.com?subject=Tacklebox%20Feedback"
          >
            Contact
          </Link>
          <Link
            className="w-fit flex flex-row items-center"
            title="Paypal Donate Link"
            href="https://www.paypal.com/donate/?hosted_button_id=BUNJWE5436NXN"
            target="_blank"
          >
            <span>Donate </span>
            <FontAwesomeIcon icon={faPaypal} className="max-h-5 h-5 ml-2" />
          </Link>
          <Link
            className="w-fit flex flex-row items-center"
            title="Ko-fi Donate Link"
            href="https://ko-fi.com/banjokaboom"
            target="_blank"
          >
            <span>Buy me coffee </span>
            <FontAwesomeIcon icon={faMugHot} className="max-h-5 h-5 ml-2" />
          </Link>
          <div className="flex flex-row pt-4">
            <Link
              className="inline-block p-2 pl-0"
              title="Github Link"
              href="https://github.com/banjokaboom"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} className="max-h-6 h-6" />
            </Link>
            <Link
              className="inline-block p-2"
              title="LinkedIn Social Link"
              href="https://www.linkedin.com/in/andrew-augusto-02b78aa6/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="max-h-6 h-6" />
            </Link>
            <Link
              className="inline-block p-2"
              title="LinkTree Social Link"
              href="https://linktr.ee/banjokaboom"
              target="_blank"
            >
              <FontAwesomeIcon icon={faTree} className="max-h-6 h-6" />
            </Link>
            <Link
              className="inline-block p-2"
              title="Reddit Social Link"
              href="https://www.reddit.com/user/tackleboxapp"
              target="_blank"
            >
              <FontAwesomeIcon icon={faRedditAlien} className="max-h-6 h-6" />
            </Link>
            <Link
              className="inline-block p-2"
              title="Twitter Social Link"
              href="https://twitter.com/tackleboxapptwt"
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitter} className="max-h-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-24 mx-auto max-w-5xl text-right hidden">
        <p className="text-xs">{process.env.NODE_ENV}</p>
      </div>
    </footer>
  )
}
