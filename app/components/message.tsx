'use client'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareCheck,
  faTriangleExclamation,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

export class MessageData {
  public message: string
  public severity: string

  constructor() {
    this.message = ''
    this.severity = ''
  }
}

export default function Message({ message, severity }: MessageData) {
  let [isHidden, setIsHidden] = useState(false)
  let severityClass = 'hidden'
  let iconSeverityClass = ''
  let icon = null
  if (severity == 'success') {
    severityClass = 'bg-green-400 text-slate-700'
    iconSeverityClass = 'text-green-800'
    icon = faSquareCheck
  } else if (severity == 'alert') {
    severityClass = 'bg-yellow-400 text-slate-700'
    iconSeverityClass = 'text-yellow-800'
    icon = faTriangleExclamation
  } else if (severity == 'error') {
    severityClass = 'bg-red-400 text-slate-700'
    iconSeverityClass = 'text-red-800'
    icon = faCircleExclamation
  }

  if (severityClass !== 'hidden') {
    setTimeout(() => {
      setIsHidden(true)
    }, 5000)
  }

  return (
    <div
      className={
        'p-4 flex flex-row items-center text-left absolute top-4 rounded-md max-w-5xl w-full ' +
        severityClass +
        (isHidden ? ' hidden' : '')
      }
    >
      <FontAwesomeIcon icon={icon} className={'mr-4 ' + iconSeverityClass} />
      {message}
    </div>
  )
}
