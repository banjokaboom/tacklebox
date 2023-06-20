import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFishFins } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-between p-12 lg:p-24 lg:pt-12 lg:pb-12 bg-slate-50 mx-auto text-slate-700">
      <div className="max-w-5xl w-full">
        <div className="flex flex-row">
          <a href="/" className="text-3xl">
            Tacklebox
          </a>
          <FontAwesomeIcon icon={faFishFins} className="max-h-8 ml-4" />
        </div>
      </div>
    </header>
  )
}
