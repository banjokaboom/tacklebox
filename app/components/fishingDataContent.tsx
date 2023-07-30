'use client'

import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import ReactHtmlParser from 'react-html-parser'
import FishingData from '../classes/FishingData'
import Tackle from '../classes/Tackle'
import ContentSection from './content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import {
  faArrowUpRightFromSquare,
  faFish,
  faCircleHalfStroke,
  faCalendar,
  faCloud,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

interface Props {
  data: FishingData
}

export default function FishingDataContent({ data }: Props) {
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [modalContent, setModalContent] = useState('')
  let [lowConfidenceTackle, setLowConfidenceTackle] = useState(new Tackle())
  const tackleAlphabetized = [...data.tackle].sort((ta, tb) =>
    ta.name.localeCompare(tb.name)
  )
  const tackleByConfidence = [...data.tackle].sort((a, b) => {
    if (a.confidence < b.confidence) {
      return 1
    }
    if (a.confidence > b.confidence) {
      return -1
    }
    // a must be equal to b
    return 0
  })

  let hasFinesseTackle = false
  data.tackle.forEach((t) => {
    if (t.type.includes('finesse')) {
      hasFinesseTackle = true
    }
  })
  let hasReactionTackle = false
  data.tackle.forEach((t) => {
    if (t.type.includes('reaction')) {
      hasReactionTackle = true
    }
  })
  let finesseTackleCount = 0
  let reactionTackleCount = 0

  let moonPhaseInnerClassName = ''
  let moonPhaseOuterClassName = ''

  switch (data.weather.astro.moon_phase) {
    case 'New Moon':
      moonPhaseInnerClassName = 'hidden'
      moonPhaseOuterClassName = 'bg-slate-700'
      break
    case 'Waxing Crescent':
      moonPhaseInnerClassName = 'bg-slate-700 right-[25%] left-0 rounded-full'
      moonPhaseOuterClassName = 'bg-slate-50'
      break
    case 'First Quarter':
      moonPhaseInnerClassName = 'bg-slate-700 right-[50%] left-0'
      moonPhaseOuterClassName = 'bg-slate-50'
      break
    case 'Waxing Gibbous':
      moonPhaseInnerClassName = 'bg-slate-50 left-[25%] right-0 rounded-full'
      moonPhaseOuterClassName = 'bg-slate-700'
      break
    case 'Full Moon':
      moonPhaseInnerClassName = 'hidden'
      moonPhaseOuterClassName = 'bg-slate-50'
      break
    case 'Waning Gibbous':
      moonPhaseInnerClassName = 'bg-slate-50 right-[25%] left-0 rounded-full'
      moonPhaseOuterClassName = 'bg-slate-700'
      break
    case 'Last Quarter':
      moonPhaseInnerClassName = 'bg-slate-700 left-[50%] right-0'
      moonPhaseOuterClassName = 'bg-slate-50'
      break
    case 'Waning Crescent':
      moonPhaseInnerClassName = 'bg-slate-700 left-[25%] right-0 rounded-full'
      moonPhaseOuterClassName = 'bg-slate-50'
      break
  }

  useEffect(() => {
    function getLowConfidenceTackle() {
      let tackleIndex = 0
      let lowConfidenceTackleArray: Tackle[] = []

      while (tackleIndex < data.tackle.length) {
        if (data.tackle[tackleIndex].confidence <= 5) {
          lowConfidenceTackleArray.push(data.tackle[tackleIndex])
        }

        tackleIndex++
      }

      return lowConfidenceTackleArray[
        Math.floor(Math.random() * lowConfidenceTackleArray.length)
      ]
    }

    let isDataLoaded = false

    if (!isDataLoaded) {
      setLowConfidenceTackle(getLowConfidenceTackle())
    }

    return () => {
      isDataLoaded = true
    }
  }, [data])

  function getTackleSpecies(tackle: Tackle) {
    let tackleSpeciesStr = '('

    tackle.species.forEach((s) => {
      if (data.species.includes(s)) {
        tackleSpeciesStr += (tackleSpeciesStr.length > 1 ? ', ' : '') + s
      }
    })

    tackleSpeciesStr += ')'

    return tackleSpeciesStr
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
      <div>
        <div className="mb-8">
          <h2 className="text-2xl underline flex flex-row items-center">
            <FontAwesomeIcon icon={faFish} className="mr-2" />
            <span>Fish and Bait</span>
          </h2>
          <div className="lg:ml-8">
            <ContentSection
              title="Species to target"
              content={data.species}
              isExpandedByDefault={true}
            ></ContentSection>

            {data.baitRecommendations.baitsToUse !== '' && (
              <ContentSection
                title="Baits to use now"
                content={data.baitRecommendations.baitsToUse}
              ></ContentSection>
            )}

            {data.baitRecommendations.stylesToUse !== '' && (
              <ContentSection
                title="Lure colors and styles to use now"
                content={data.baitRecommendations.stylesToUse}
              ></ContentSection>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl underline flex flex-row items-center">
            <FontAwesomeIcon
              icon={faCircleHalfStroke}
              className="mr-2 -rotate-90"
            />
            <span>Lures and Rigs</span>
          </h2>
          <div className="lg:ml-8">
            {hasReactionTackle && (
              <ContentSection
                title="Best reaction lures and rigs"
                content={tackleByConfidence.map((t, index) => {
                  if (!t.type.includes('reaction')) {
                    return
                  }
                  reactionTackleCount++
                  return (
                    reactionTackleCount <= 5 && (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div
                            className={
                              'flex flex-col' + t.tip ? ' mb-4 md:mb-0' : ''
                            }
                          >
                            <div className="flex flex-row items-center">
                              {t.tip && (
                                <button
                                  className="flex flex-row items-center text-left w-full text-yellow-400 font-bold"
                                  title="Click to learn how to use this"
                                  onClick={() => {
                                    setModalContent(t.tip)
                                    setIsModalOpen(true)
                                  }}
                                >
                                  <span>{t.name}</span>
                                  <FontAwesomeIcon
                                    icon={faCircleQuestion}
                                    className="ml-2"
                                  />
                                </button>
                              )}
                              {!t.tip && (
                                <p className="text-yellow-400 font-bold">
                                  {t.name}
                                </p>
                              )}
                            </div>
                            <p className="text-sm">{getTackleSpecies(t)}</p>
                          </div>
                          {!t.name.toUpperCase().includes('RIG') && (
                            <div>
                              <a
                                title={
                                  'Amazon Buy link for ' +
                                  t.name +
                                  ' fishing lures'
                                }
                                target="_blank"
                                className="p-2 w-fit bg-slate-700 border hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
                                href={
                                  'https://www.amazon.com/gp/search?ie=UTF8&tag=bearededfisha-20&linkCode=ur2&linkId=9b3fecfa6e628523da72d3db87d3cd35&camp=1789&creative=9325&index=aps&keywords=' +
                                  t.name +
                                  ' fishing lures'
                                }
                              >
                                <span>Buy</span>
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                  className="ml-2 max-h-4"
                                />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )
                })}
                isExpandedByDefault={true}
              ></ContentSection>
            )}

            {hasFinesseTackle && (
              <ContentSection
                title="Best finesse lures and rigs"
                content={tackleByConfidence.map((t, index) => {
                  if (!t.type.includes('finesse')) {
                    return
                  }
                  finesseTackleCount++
                  return (
                    finesseTackleCount <= 5 && (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div
                            className={
                              'flex flex-col' + t.tip ? ' mb-4 md:mb-0' : ''
                            }
                          >
                            <div className="flex flex-row items-center">
                              {t.tip && (
                                <button
                                  className="flex flex-row items-center text-left w-full text-yellow-400 font-bold"
                                  title="Click to learn how to use this"
                                  onClick={() => {
                                    setModalContent(t.tip)
                                    setIsModalOpen(true)
                                  }}
                                >
                                  <span className="text-yellow-400">
                                    {t.name}
                                  </span>
                                  <FontAwesomeIcon
                                    icon={faCircleQuestion}
                                    className="ml-2"
                                  />
                                </button>
                              )}
                              {!t.tip && (
                                <p className="text-yellow-400 font-bold">
                                  {t.name}
                                </p>
                              )}
                            </div>
                            <p className="text-sm">{getTackleSpecies(t)}</p>
                          </div>
                          {!t.name.toUpperCase().includes('RIG') && (
                            <div>
                              <a
                                title={
                                  'Amazon Buy link for ' +
                                  t.name +
                                  ' fishing lures'
                                }
                                target="_blank"
                                className="p-2 w-fit bg-slate-700 border hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
                                href={
                                  'https://www.amazon.com/gp/search?ie=UTF8&tag=bearededfisha-20&linkCode=ur2&linkId=9b3fecfa6e628523da72d3db87d3cd35&camp=1789&creative=9325&index=aps&keywords=' +
                                  t.name +
                                  ' fishing lures'
                                }
                              >
                                <span>Buy</span>
                                <FontAwesomeIcon
                                  icon={faArrowUpRightFromSquare}
                                  className="ml-2 max-h-4"
                                />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )
                })}
                isExpandedByDefault={true}
              ></ContentSection>
            )}

            {data.tackle.length > 0 && (
              <ContentSection
                title="All lures and rigs for conditions"
                content={tackleAlphabetized.map((t, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div
                        className={
                          'flex flex-col' + t.tip ? ' mb-4 md:mb-0' : ''
                        }
                      >
                        <div className="flex flex-row items-center">
                          {t.tip && (
                            <button
                              className="flex flex-row items-center text-left w-full text-yellow-400 font-bold"
                              title="Click to learn how to use this"
                              onClick={() => {
                                setModalContent(t.tip)
                                setIsModalOpen(true)
                              }}
                            >
                              <span className="text-yellow-400">{t.name}</span>
                              <FontAwesomeIcon
                                icon={faCircleQuestion}
                                className="ml-2"
                              />
                            </button>
                          )}
                          {!t.tip && (
                            <p className="text-yellow-400 font-bold">
                              {t.name}
                            </p>
                          )}
                        </div>
                        <p className="text-sm">{getTackleSpecies(t)}</p>
                      </div>
                      {!t.name.toUpperCase().includes('RIG') && (
                        <div>
                          <a
                            title={
                              'Amazon Buy link for ' + t.name + ' fishing lures'
                            }
                            target="_blank"
                            className="p-2 w-fit bg-slate-700 border hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
                            href={
                              'https://www.amazon.com/gp/search?ie=UTF8&tag=bearededfisha-20&linkCode=ur2&linkId=9b3fecfa6e628523da72d3db87d3cd35&camp=1789&creative=9325&index=aps&keywords=' +
                              t.name +
                              ' fishing lures'
                            }
                          >
                            <span>Buy</span>
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className="ml-2 max-h-4"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              ></ContentSection>
            )}

            {data.tackle.length > 0 && (
              <ContentSection
                title="Try something new"
                content={
                  <div className="mb-4 last:mb-0">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div
                        className={
                          'flex flex-col' + lowConfidenceTackle.tip
                            ? ' mb-4 md:mb-0'
                            : ''
                        }
                      >
                        <div className="flex flex-row items-center">
                          {lowConfidenceTackle.tip && (
                            <button
                              className="flex flex-row items-center text-left text-yellow-400 font-bold"
                              title="Click to learn how to use this"
                              onClick={() => {
                                setModalContent(lowConfidenceTackle.tip)
                                setIsModalOpen(true)
                              }}
                            >
                              <span>{lowConfidenceTackle.name}</span>
                              <FontAwesomeIcon
                                icon={faCircleQuestion}
                                className="ml-2"
                              />
                            </button>
                          )}
                          {!lowConfidenceTackle.tip && (
                            <p className="text-yellow-400 font-bold">
                              {lowConfidenceTackle.name}
                            </p>
                          )}
                        </div>
                        <p className="text-sm">
                          {getTackleSpecies(lowConfidenceTackle)}
                        </p>
                      </div>
                      {!lowConfidenceTackle.name
                        .toUpperCase()
                        .includes('RIG') && (
                        <div>
                          <a
                            title={
                              'Amazon Buy link for ' +
                              lowConfidenceTackle.name +
                              ' fishing lures'
                            }
                            target="_blank"
                            className="p-2 w-fit bg-slate-700 border hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
                            href={
                              'https://www.amazon.com/gp/search?ie=UTF8&tag=bearededfisha-20&linkCode=ur2&linkId=9b3fecfa6e628523da72d3db87d3cd35&camp=1789&creative=9325&index=aps&keywords=' +
                              lowConfidenceTackle.name +
                              ' fishing lures'
                            }
                          >
                            <span>Buy</span>
                            <FontAwesomeIcon
                              icon={faArrowUpRightFromSquare}
                              className="ml-2 max-h-4"
                            />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                }
              ></ContentSection>
            )}

            {data.species.includes('Not ideal') && (
              <div className="pt-4">
                <p className="mb-4">
                  It may not be ideal fishing for any species, but you can still
                  fish! Get specific lure suggestions by species here:
                </p>

                <Link
                  className="w-full lg:basis-3/12 shrink-0 mb-4 lg:mb-0 flex flex-col p-8 border bg-slate-50 text-slate-700 hover:bg-transparent hover:text-slate-50 text-center rounded-md transition-all"
                  href="/fishing/tackle-by-species"
                >
                  <FontAwesomeIcon icon={faFish} className="mb-4 h-16" />
                  <span>Tackle by Species</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="basis-4/12 shrink-0">
        <div className="mb-8">
          <h2 className="text-2xl underline flex flex-row items-center">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
            <span>Seasonal Info</span>
          </h2>
          <div className="lg:ml-8">
            <ContentSection
              title="Season"
              content={data.seasons}
            ></ContentSection>

            <ContentSection
              title="Best times to fish"
              content={
                <div>
                  <p>
                    OK:{' '}
                    {!data.seasons.includes('summer') &&
                    !data.seasons.includes('winter')
                      ? 'early morning'
                      : 'late morning/early afternoon'}
                  </p>
                  <p>
                    Good:{' '}
                    {!data.seasons.includes('summer') &&
                    !data.seasons.includes('winter')
                      ? 'late morning/early afternoon'
                      : 'early morning'}
                  </p>
                  <p>Great: late afternoon/early evening</p>
                </div>
              }
            ></ContentSection>
            <ContentSection
              title="Astrological Info"
              content={
                <div>
                  <p className="mb-4">Sunrise: {data.weather.astro.sunrise}</p>
                  <p className="mb-4">Sunset: {data.weather.astro.sunset}</p>
                  <p className="mb-4">
                    Moonrise: {data.weather.astro.moonrise}
                  </p>
                  <p className="mb-4">Moonset: {data.weather.astro.moonset}</p>
                  <p className="mb-2">
                    Moon phase: {data.weather.astro.moon_phase}
                  </p>
                  <div
                    className={
                      'rounded-full overflow-hidden h-10 w-10 relative border-2 ' +
                      moonPhaseOuterClassName
                    }
                  >
                    <div
                      className={'absolute h-full ' + moonPhaseInnerClassName}
                    ></div>
                  </div>
                </div>
              }
            ></ContentSection>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl underline flex flex-row items-center">
            <FontAwesomeIcon icon={faCloud} className="mr-2" />
            <span>Weather</span>
          </h2>
          <div className="lg:ml-8">
            <ContentSection
              title="Current Weather"
              content={
                <div>
                  <p className="mb-4">
                    Outdoor Temperature: {data.weather.current.outdoorTemp}
                  </p>
                  <p className="mb-4">
                    Estimated Water Temperature:{' '}
                    {data.weather.current.waterTemp}
                  </p>
                  <p className="mb-4">
                    Conditions: {data.weather.current.conditions}
                  </p>
                  <p className="mb-4">Wind: {data.weather.current.wind}</p>
                  <p>Pressure: {data.weather.pressure}in.</p>
                </div>
              }
              isExpandedByDefault={true}
            ></ContentSection>

            <ContentSection
              title="Today's Weather"
              content={
                <div>
                  <p className="mb-4">
                    Outdoor Temperature: {data.weather.forecast.outdoorTemp}
                  </p>
                  <p className="mb-4">
                    Estimated Water Temperature:{' '}
                    {data.weather.forecast.waterTemp}
                  </p>
                  <p className="mb-4">
                    Conditions: {data.weather.forecast.conditions}
                  </p>
                  <p>Wind: {data.weather.forecast.wind}</p>
                </div>
              }
              isExpandedByDefault={true}
            ></ContentSection>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} contentLabel="Tackle Modal">
        <div className="text-slate-700 mb-4">
          {ReactHtmlParser(modalContent)}
        </div>
        <button
          className="p-2 w-fit bg-yellow-400 hover:bg-slate-50 text-slate-700 rounded-md"
          onClick={() => {
            setIsModalOpen(false)
          }}
        >
          Close
        </button>
      </Modal>
    </div>
  )
}
