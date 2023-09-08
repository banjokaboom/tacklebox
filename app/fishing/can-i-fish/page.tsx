'use client'

import { useState, useEffect } from 'react'
import { compareDates } from '@/app/helpers/date'
import Loader from '@/app/components/loader'
import ContentSection from '@/app/components/content'
import Message from '@/app/components/message'
import MessageData from '@/app/classes/MessageData'
import Breadcrumbs from '@/app/components/breadcrumbs'
import Regulations from '@/app/classes/Regulations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'

function getCreelLimitForIndex(seasonLimits: string[], index: number) {
  if (seasonLimits[index] && seasonLimits[index].trim() == '') {
    let i = index
    while (i > 0) {
      i--
      if (seasonLimits[i].trim() !== '') {
        return seasonLimits[i]
      }
    }
  } else if (seasonLimits[index]) {
    return seasonLimits[index].trim()
  } else {
    let i = index
    while (i > 0) {
      i--
      if (seasonLimits[i] && seasonLimits[i].trim() !== '') {
        return seasonLimits[i]
      }
    }
  }
}

export default function CanIFish() {
  let [data, setData] = useState(new Regulations())
  let [message, setMessage] = useState(new MessageData())
  let [regulationsState, setRegulationsState] = useState('')
  let breadcrumbs = [
    {
      title: 'Fishing',
      href: '/fishing',
    },
    {
      title: 'Can I Fish',
      href: '/fishing/can-i-fish',
    },
  ]
  let [filterText, setFilterText] = useState('')

  useEffect(() => {
    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      setData(new Regulations())

      try {
        let data = new Regulations()

        if (regulationsState == 'MA') {
          data = await getMARegulations()
        } else if (regulationsState == 'RI') {
          data = await getRIRegulations()
        }

        if (!isDataLoaded) {
          m.message =
            'Successfully loaded fishing regulations for ' + regulationsState
          m.severity = 'success'
          setMessage(m)
          setData(data)
        }
      } catch (error: any) {
        m.message = error
        m.severity = 'error'
        setMessage(m)
      }
    }

    async function fetchRegulations(endpoint: string) {
      let regulations: any[] = []

      await fetch('/api/' + endpoint, {
        cache: 'no-store',
      })
        .then((res) => res.json())
        .then((data) => {
          let fishingRegulations: object[] = []

          data.fishingData.forEach((regulation: any) => {
            let dates = regulation.seasonDates

            if (Array.isArray(dates)) {
              dates.forEach((date: object) => {
                if (compareDates(date)) {
                  fishingRegulations.push(regulation)
                }
              })
            }
          })

          regulations.push(fishingRegulations)
          regulations.push(data.regulationsLink)
        })

      return regulations
    }

    async function getRIRegulations() {
      let regulations = new Regulations()

      const freshResults = await fetchRegulations('freshRI')
      const saltResults = await fetchRegulations('saltRI')

      regulations.freshwaterRegulations = freshResults[0]
      regulations.freshwaterRegulationsLink = freshResults[1]

      regulations.saltwaterRegulations = saltResults[0]
      regulations.saltwaterRegulationsLink = saltResults[1]

      return regulations
    }

    async function getMARegulations() {
      let regulations = new Regulations()

      const freshResults = await fetchRegulations('freshMA')
      const saltResults = await fetchRegulations('saltMA')

      regulations.freshwaterRegulations = freshResults[0]
      regulations.freshwaterRegulationsLink = freshResults[1]

      regulations.saltwaterRegulations = saltResults[0]
      regulations.saltwaterRegulationsLink = saltResults[1]

      return regulations
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [regulationsState])

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">
          Can I Fish:{' '}
          {data.freshwaterRegulationsLink == ''
            ? '—'
            : data.freshwaterRegulations.length > 0 ||
              data.saltwaterRegulations.length > 0
            ? 'Yes'
            : 'No'}
        </h1>
        <hr className="mb-4" />
        <p className="mb-4">
          This app loads the fishing regulations, both saltwater and freshwater,
          for the chosen state, and determines if you are legally able to fish
          now. Then, it displays all of the species you are eligible to fish for
          with their regulations listed. Data is scraped from the official
          regulations site.
        </p>
        <div className="mb-4">
          <label htmlFor="regulationsState" className="mb-4 block">
            Regulations State
          </label>
          <select
            name="regulationsState"
            id="regulationsState"
            value={regulationsState}
            onChange={(e) => {
              setRegulationsState(e.target.value)
            }}
            className="text-slate-700 leading-4 p-2 block max-w-full mb-4"
          >
            <option value="">Select State...</option>
            <option value="MA">Massachusetts</option>
            <option value="RI">Rhode Island</option>
          </select>
        </div>

        {(!data.freshwaterRegulations ||
          data.freshwaterRegulations.length == 0) &&
          (!data.saltwaterRegulations ||
            data.saltwaterRegulations.length == 0) &&
          regulationsState !== '' && <Loader />}
        {data.freshwaterRegulations &&
          data.freshwaterRegulations.length > 0 && (
            <div>
              <div className="mb-4">
                <label htmlFor="filterText" className="mb-4 block">
                  Filter Species By...
                </label>
                <input
                  type="text"
                  name="filterText"
                  id="filterText"
                  value={filterText}
                  placeholder='Type to filter, i.e. "bass"'
                  onChange={(e) => {
                    setFilterText(e.target.value)
                  }}
                  className="text-slate-700 leading-4 p-2 block max-w-full"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <a
                  href={data.freshwaterRegulationsLink}
                  className="underline hover:no-underline hover:tracking-wide transition-[letter-spacing] flex flex-row items-center"
                  target="_blank"
                >
                  <span>Freshwater Regulations</span>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="ml-2 max-h-4"
                  />
                </a>
              </h2>
              <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
                {data.freshwaterRegulations.map(
                  (f, fIndex: number) =>
                    (filterText == '' ||
                      f.species
                        .toUpperCase()
                        .includes(filterText.toUpperCase())) && (
                      <div key={fIndex} className="pb-8">
                        <ContentSection
                          subtitle={f.species}
                          isExpandedByDefault={true}
                        >
                          <div>
                            {f.description &&
                              f.description.trim() !== f.species.trim() && (
                                <p className="mb-4">{f.description}</p>
                              )}
                            <p className="mb-4">Fishing dates:</p>
                            <div className="mb-4">
                              {f.seasonDates.map(
                                (sd: string, sdIndex: number) => (
                                  <p key={sdIndex} className="indent-4">
                                    {sd.replace(', ', '').trim()}, Limit:{' '}
                                    {getCreelLimitForIndex(
                                      f.seasonLimits,
                                      sdIndex
                                    )}
                                  </p>
                                )
                              )}
                            </div>
                            {f.minimumLength && (
                              <p className="mb-4">
                                Min. Length:{' '}
                                {/\d+/.test(f.minimumLength) &&
                                !f.minimumLength.includes('"')
                                  ? f.minimumLength + '"'
                                  : f.minimumLength}
                              </p>
                            )}
                          </div>
                        </ContentSection>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        {data.saltwaterRegulations && data.saltwaterRegulations.length > 0 && (
          <div>
            <h2 className="text-2xl mb-4">
              <a
                href={data.saltwaterRegulationsLink}
                className="underline hover:no-underline hover:tracking-wide transition-[letter-spacing] flex flex-row items-center"
                target="_blank"
              >
                <span>Saltwater Regulations</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="ml-2 max-h-4"
                />
              </a>
            </h2>
            <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
              {data.saltwaterRegulations.map(
                (s, sIndex) =>
                  (filterText == '' ||
                    s.species
                      .toUpperCase()
                      .includes(filterText.toUpperCase())) && (
                    <div key={sIndex} className="pb-8">
                      <ContentSection
                        subtitle={s.species}
                        isExpandedByDefault={true}
                      >
                        <div>
                          {s.description &&
                            s.description.trim() !== s.species.trim() && (
                              <p className="mb-4">{s.description}</p>
                            )}
                          <p className="mb-4">Fishing dates:</p>
                          <div className="mb-4">
                            {s.seasonDates.map(
                              (sd: string, sdIndex: number) => (
                                <p key={sdIndex} className="indent-4">
                                  {sd.replace(', ', '').trim()}, Limit:{' '}
                                  {getCreelLimitForIndex(
                                    s.seasonLimits,
                                    sdIndex
                                  )}
                                </p>
                              )
                            )}
                          </div>
                          {s.minimumLength && (
                            <p className="mb-4">
                              Min. Length: {s.minimumLength}
                            </p>
                          )}
                        </div>
                      </ContentSection>
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>

      {message.message !== '' && (
        <Message
          message={message.message}
          severity={message.severity}
        ></Message>
      )}
    </div>
  )
}
