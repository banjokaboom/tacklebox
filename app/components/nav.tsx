import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTwitter,
  faRedditAlien,
  faPaypal,
  faGithub,
  faLinkedinIn,
} from '@fortawesome/free-brands-svg-icons'

export default function Nav() {
  return (
    <nav className="p-12 lg:p-24 lg:pt-16 lg:pb-16 bg-cyan-700 mx-auto">
      <div className="mx-auto max-w-5xl flex lg:flex-row flex-col justify-between items-start">
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <a className="mb-4 w-fit" href="/">
            Home
          </a>
          <h4 className="text-lg mb-4 underline">Fishing</h4>
          <a className="w-fit" href="/pages/can-i-fish">
            Can I Fish (MA)
          </a>
          <a className="w-fit mb-4" href="/pages/what-to-fish">
            What to Fish (Freshwater)
          </a>
          <h4 className="text-lg mb-4 underline">Home Maintenance</h4>
          <a className="w-fit lg:mb-4" href="/pages/oil-prices">
            Oil Prices (MA)
          </a>
        </div>
        <div className="flex flex-col justify-between lg:mb-0 mb-4">
          <h4 className="text-lg mb-4 underline">Personal</h4>
          <a className="w-fit mb-4 " href="/pages/what-to-make">
            What to Make for Dinner
          </a>
          <h4 className="text-lg mb-4 underline">Social</h4>
          <a className="w-fit" href="/pages/about">
            About
          </a>
          <a className="w-fit" href="/pages/contact">
            Contact
          </a>
          <div className="flex flex-row pt-4">
            <a
              className="inline-block p-2 pl-0"
              title="Github Link"
              href="https://github.com/banjokaboom"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} className="max-h-6 h-6" />
            </a>
            <a
              className="inline-block p-2"
              title="LinkedIn Social Link"
              href="https://www.linkedin.com/in/andrew-augusto-02b78aa6/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="max-h-6 h-6" />
            </a>
            <a
              className="inline-block p-2"
              title="Paypal Donate Link"
              href="https://www.paypal.com/donate/?hosted_button_id=BUNJWE5436NXN"
              target="_blank"
            >
              <FontAwesomeIcon icon={faPaypal} className="max-h-6 h-6" />
            </a>
            <a
              className="inline-block p-2"
              title="Reddit Social Link"
              href="https://www.reddit.com/user/tackleboxapp"
              target="_blank"
            >
              <FontAwesomeIcon icon={faRedditAlien} className="max-h-6 h-6" />
            </a>
            <a
              className="inline-block p-2"
              title="Twitter Social Link"
              href="https://twitter.com/tackleboxapptwt"
              target="_blank"
            >
              <FontAwesomeIcon icon={faTwitter} className="max-h-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="pt-24 mx-auto max-w-5xl text-right hidden">
        <p className="text-xs">{process.env.NODE_ENV}</p>
      </div>
    </nav>
  )
}
