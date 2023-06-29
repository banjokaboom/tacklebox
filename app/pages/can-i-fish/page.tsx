'use client'

import { useState, useEffect } from 'react'
import { compareDates } from '../../helpers/date'
import Loader from '../../components/loader'
import ContentSection from '@/app/components/content'

class Regulations {
  public freshwaterRegulations: Regulation[]
  public freshwaterRegulationsLink: string
  public saltwaterRegulations: Regulation[]
  public saltwaterRegulationsLink: string

  constructor() {
    this.freshwaterRegulations = []
    this.freshwaterRegulationsLink = ''
    this.saltwaterRegulations = []
    this.saltwaterRegulationsLink = ''
  }
}

class Regulation {
  public species: string
  public description: string
  public seasonDates: string[]
  public seasonLimits: string[]

  constructor() {
    this.species = ''
    this.description = ''
    this.seasonDates = []
    this.seasonLimits = []
  }
}

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
      if (seasonLimits[i].trim() !== '') {
        return seasonLimits[i]
      }
    }
  }
}

export default function CanIFish() {
  let [data, setData] = useState(new Regulations())

  useEffect(() => {
    async function getData() {
      setData(new Regulations())
      let data = await getMARegulations()

      if (!isDataLoaded) {
        setData(data)
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
          let canIFish = false

          data.fishingData.forEach((regulation: any) => {
            let dates = regulation.seasonDates

            if (typeof dates == 'object') {
              dates.forEach((date: object) => {
                if (compareDates(date)) {
                  fishingRegulations.push(regulation)

                  canIFish = true
                }
              })
            }
          })

          if (canIFish) {
            regulations.push(fishingRegulations)
            regulations.push(data.regulationsLink)
          }
        })

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
  }, [])

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl mb-4">
          Can I Fish:{' '}
          {data.freshwaterRegulations.length > 0 ||
          data.saltwaterRegulations.length > 0
            ? 'Yes'
            : 'No'}
        </h1>
        <hr />
        {(!data.freshwaterRegulations ||
          data.freshwaterRegulations.length == 0) &&
          (!data.saltwaterRegulations ||
            data.saltwaterRegulations.length == 0) && <Loader />}
        {data.freshwaterRegulations &&
          data.freshwaterRegulations.length > 0 && (
            <div>
              <h2 className="text-2xl pb-8 pt-8">Freshwater Regulations</h2>
              <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
                {data.freshwaterRegulations.map((f, fIndex: number) => (
                  <div key={fIndex} className="pb-8">
                    <ContentSection
                      subtitle={f.species}
                      content={
                        <div>
                          {f.description &&
                            f.description.trim() !== f.species.trim() && (
                              <p className="mb-4">{f.description}</p>
                            )}
                          <p className="mb-4">Fishing dates:</p>
                          <div>
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
                        </div>
                      }
                      isExpandedByDefault={true}
                    ></ContentSection>
                  </div>
                ))}
              </div>
            </div>
          )}
        {data.saltwaterRegulations && data.saltwaterRegulations.length > 0 && (
          <div>
            <h2 className="text-2xl pb-8 pt-8">Saltwater Regulations</h2>
            <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
              {data.saltwaterRegulations.map((s, sIndex) => (
                <div key={sIndex} className="pb-8">
                  <ContentSection
                    subtitle={s.species}
                    content={
                      <div>
                        {s.description.trim() !== s.species.trim() && (
                          <p className="mb-4">{s.description}</p>
                        )}
                        <p className="mb-4">Fishing dates:</p>
                        <div>
                          {s.seasonDates.map((sd: string, sdIndex: number) => (
                            <p key={sdIndex} className="indent-4">
                              {sd.replace(', ', '').trim()}, Limit:{' '}
                              {getCreelLimitForIndex(s.seasonLimits, sdIndex)}
                            </p>
                          ))}
                        </div>
                      </div>
                    }
                    isExpandedByDefault={true}
                  ></ContentSection>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
