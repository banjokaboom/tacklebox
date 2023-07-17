'use client'

import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import ReactHtmlParser from 'react-html-parser'
import FishingData from '../classes/FishingData'
import Tackle from '../classes/Tackle'
import ContentSection from './content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'

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
  }, [])

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
    <div>
      <div className="lg:p-4 lg:rounded-md lg:border mb-8">
        <h2 className="text-2xl mb-4 underline">Basic Fishing Info</h2>
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
          <div>
            <ContentSection
              title="Species to target"
              content={data.species}
              isExpandedByDefault={true}
            ></ContentSection>

            {data.tackle.length > 0 &&
              data.baitRecommendations.colorsToUse !== '' && (
                <ContentSection
                  title="Lure colors to use now"
                  content={data.baitRecommendations.colorsToUse}
                  isExpandedByDefault={true}
                ></ContentSection>
              )}

            {data.tackle.length > 0 && (
              <ContentSection
                title="Suggested lures and rigs to use"
                content={tackleByConfidence.map(
                  (t, index) =>
                    index < 5 && (
                      <div key={index} className="mb-4 last:mb-0">
                        {t.tip && (
                          <button
                            className="flex flex-row items-center text-left"
                            title="Click to learn how to use this"
                            onClick={() => {
                              setModalContent(t.tip)
                              setIsModalOpen(true)
                            }}
                          >
                            {t.name}
                            <FontAwesomeIcon
                              icon={faCircleQuestion}
                              className="ml-2"
                            />
                          </button>
                        )}
                        {!t.tip && <p>{t.name}</p>}
                        <p className="text-sm">{getTackleSpecies(t)}</p>
                      </div>
                    )
                )}
                isExpandedByDefault={true}
              ></ContentSection>
            )}

            {data.tackle.length > 0 && (
              <ContentSection
                title="Try something new"
                content={
                  <div className="mb-4 last:mb-0">
                    {lowConfidenceTackle.tip && (
                      <button
                        className="flex flex-row items-center text-left"
                        title="Click to learn how to use this"
                        onClick={() => {
                          setModalContent(lowConfidenceTackle.tip)
                          setIsModalOpen(true)
                        }}
                      >
                        {lowConfidenceTackle.name}
                        <FontAwesomeIcon
                          icon={faCircleQuestion}
                          className="ml-2"
                        />
                      </button>
                    )}
                    {!lowConfidenceTackle.tip && (
                      <p>{lowConfidenceTackle.name}</p>
                    )}
                    <p className="text-sm">
                      {getTackleSpecies(lowConfidenceTackle)}
                    </p>
                  </div>
                }
                isExpandedByDefault={true}
              ></ContentSection>
            )}
          </div>
          <div className="basis-4/12 shrink-0">
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
      <div className="lg:p-4 lg:rounded-md lg:border">
        <h2 className="text-2xl mb-4 underline">Advanced Fishing Info</h2>
        <div className="flex flex-col lg:flex-row justify-between lg:space-x-8">
          <div>
            {data.tackle.length > 0 && (
              <ContentSection
                title="Baits to use now"
                content={data.baitRecommendations.baitsToUse}
              ></ContentSection>
            )}

            {data.tackle.length > 0 && (
              <ContentSection
                title="All lures and rigs for conditions"
                content={tackleAlphabetized.map((t, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    {t.tip && (
                      <button
                        className="flex flex-row items-center"
                        title="Click to learn how to use this"
                        onClick={() => {
                          setModalContent(t.tip)
                          setIsModalOpen(true)
                        }}
                      >
                        {t.name}
                        <FontAwesomeIcon
                          icon={faCircleQuestion}
                          className="ml-2"
                        />
                      </button>
                    )}
                    {!t.tip && <p>{t.name}</p>}
                    <p className="text-sm">{getTackleSpecies(t)}</p>
                  </div>
                ))}
              ></ContentSection>
            )}
          </div>
          <div className="basis-4/12 shrink-0">
            <ContentSection
              title="Season"
              content={data.seasons}
            ></ContentSection>

            <ContentSection
              title="Best times to fish"
              content={
                <div>
                  <p>
                    Bad:{' '}
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
                  <p>Best: late afternoon/early evening</p>
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
                  <p className="mb-4">
                    Moon phase: {data.weather.astro.moon_phase}
                  </p>
                </div>
              }
            ></ContentSection>
          </div>
        </div>

        <Modal isOpen={isModalOpen} contentLabel="Tackle Modal">
          <div className="text-slate-700 mb-4">
            {ReactHtmlParser(modalContent)}
          </div>
          <button
            className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
            onClick={() => {
              setIsModalOpen(false)
            }}
          >
            Close
          </button>
        </Modal>
      </div>
    </div>
  )
}
