import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { ReactNode } from 'react'

export default function Loader({ children }: { children?: ReactNode }) {
  return (
    <div className="pt-12 pb-12 flex flex-row">
      {children || 'Loading...'}
      <FontAwesomeIcon icon={faSpinner} className="h-8 ml-4 animate-spin" />
    </div>
  )
}
