import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loader() {
  return (
    <div className="pt-12 pb-12 flex flex-row">
      Loading
      <FontAwesomeIcon icon={faSpinner} className="h-8 ml-4 animate-spin" />
    </div>
  )
}
