'use client'

import { useState } from 'react'
import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

interface Props {
  title?: string
  subtitle?: string
  content: ReactNode
  isExpandedByDefault?: boolean
}

export default function ContentSection({
  title,
  subtitle,
  content,
  isExpandedByDefault,
}: Props) {
  let [isExpanded, setIsExpanded] = useState(isExpandedByDefault || false)

  return (
    <div>
      {title && (
        <button
          title={'Click to expand ' + title + ' section'}
          className="text-2xl pb-4 pt-4 flex flex-row items-center text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{title}</span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={
              'ml-4 transition-transform ' +
              (isExpanded ? 'rotate-90' : 'rotate-0')
            }
          />
        </button>
      )}
      {subtitle && !title && (
        <button
          title={'Click to expand ' + subtitle + ' section'}
          className="text-xl mb-4 flex flex-row items-center text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{subtitle}</span>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={
              'ml-4 transition-transform ' +
              (isExpanded ? 'rotate-90' : 'rotate-0')
            }
          />
        </button>
      )}
      {subtitle && title && (
        <h3 className="mb-4 text-xl text-left">
          <span>{subtitle}</span>
        </h3>
      )}
      {content && (
        <div
          className={
            'border border-slate-50 bg-slate-700 p-4 rounded-md ' +
            (!isExpanded ? 'hidden' : '')
          }
        >
          <div>{content}</div>
        </div>
      )}
    </div>
  )
}
