'use client'

import { default as Logger } from 'pino'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquareCheck,
  faTriangleExclamation,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import MessageData from '@/app/classes/MessageData'

export default function Message({ message, severity }: MessageData) {
  const logger = Logger({})
  let [isHidden, setIsHidden] = useState(false)
  let severityClass = ''
  let iconSeverityClass = ''
  let icon = faTriangleExclamation
  if (severity == 'success') {
    logger.info(message)
    severityClass = 'bg-green-400 text-slate-700'
    iconSeverityClass = 'text-green-800'
    icon = faSquareCheck
  } else if (severity == 'alert') {
    logger.warn(message)
    severityClass = 'bg-yellow-400 text-slate-700'
    iconSeverityClass = 'text-yellow-800'
    icon = faTriangleExclamation
  } else if (severity == 'error') {
    logger.error(message)
    severityClass = 'bg-red-400 text-slate-700'
    iconSeverityClass = 'text-red-800'
    icon = faCircleExclamation
  }

  if (severityClass !== '') {
    setTimeout(() => {
      setIsHidden(true)
    }, 5000)
  }

  return (
    <div
      className={
        'p-4 flex flex-row items-center text-left fixed transition-[top] rounded-md max-w-5xl w-full ' +
        severityClass +
        (isHidden ? ' -top-24' : ' top-6')
      }
      role="alert"
      aria-live={severity == 'error' ? 'assertive' : 'polite'}
    >
      <FontAwesomeIcon icon={icon} className={'mr-4 ' + iconSeverityClass} />
      {message}
    </div>
  )
}
