'use client'

import { default as Logger } from 'pino'
import { useState, useEffect } from 'react'
import Loader from '@/app/components/loader'
import ContentSection from '@/app/components/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import Message from '@/app/components/message'
import MessageData from '@/app/classes/MessageData'
import Breadcrumbs from '@/app/components/breadcrumbs'
import FishingData from '@/app/classes/FishingData'
import Modal from 'react-modal'
import ReactHtmlParser from 'react-html-parser'
import Tackle from '@/app/classes/Tackle'

export default function TackleBySpecies() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState(new FishingData())
  let [message, setMessage] = useState(new MessageData())
  let [species, setSpecies] = useState('')
  let [speciesList, setSpeciesList] = useState([])
  let [isModalOpen, setIsModalOpen] = useState(false)
  let [modalContent, setModalContent] = useState('')
  let [luckyTackle, setLuckyTackle] = useState('')
  let breadcrumbs = [
    {
      title: 'Fishing',
      href: '/fishing',
    },
    {
      title: 'Tackle by Species',
      href: '/fishing/tackle-by-species',
    },
  ]

  useEffect(() => {
    const logger = Logger({})
    setLoading(true)

    let m = new MessageData()
    setMessage(new MessageData())

    async function getData() {
      if (isDataLoaded) {
        return
      }

      try {
        await fetch('/api/species')
          .then((res) => res.json())
          .then((json) => {
            setSpeciesList(json.species)
          })
      } catch (error) {
        logger.error(error)
        m.message =
          'An error occurred when loading the species list. Please try refreshing the page.'
        m.severity = 'error'
        setMessage(m)
      }

      setLoading(false)
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [])

  useEffect(() => {
    let m = new MessageData()
    setMessage(new MessageData())
    setLuckyTackle('')

    async function getData() {
      setData(new FishingData())

      if (isDataLoaded || species == '') {
        return
      }

      setLoading(true)

      try {
        await fetch('/api/tackle?species=' + species)
          .then((res) => res.json())
          .then((json) => {
            if (json.tackle.length > 0) {
              let fishingData = new FishingData()
              fishingData.tackle = json.tackle.sort((a: Tackle, b: Tackle) => {
                if (a.confidence < b.confidence) {
                  return 1
                }
                if (a.confidence > b.confidence) {
                  return -1
                }
                // a must be equal to b
                return 0
              })

              m.message = 'Successfully loaded tackle for species ' + species
              m.severity = 'success'

              setData(fishingData)
            } else {
              m.message = 'No tackle loaded for species ' + species
              m.severity = 'alert'
            }
          })
      } catch (error: any) {
        m.message = error
        m.severity = 'error'
      }

      setMessage(m)
      setLoading(false)
    }

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [species, speciesList])

  function chooseRandomTackle() {
    setLuckyTackle('')
    if (data.tackle.length == 0) {
      return
    }

    const randomIndex = Math.floor(Math.random() * data.tackle.length)

    setLuckyTackle(data.tackle[randomIndex].name)
  }

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Tackle by Species</h1>
        <hr className="mb-4" />
        <p className="mb-4">
          Need help picking what lure or rig to use for a specific species?
          Start by picking a species.
        </p>
        {speciesList.length > 0 && (
          <div className="mb-4">
            <label htmlFor="species" className="mb-4 block">
              Species
            </label>
            <select
              name="species"
              id="species"
              onChange={(e) => {
                setSpecies(e.target.value)
              }}
              className="text-slate-700 leading-4 p-2 block max-w-full"
              value={species}
            >
              <option value="">Select Species...</option>
              {speciesList.map((s: string, sIndex: number) => (
                <option key={sIndex} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
        {loading && <Loader />}
        {data.tackle.length > 0 && (
          <div>
            <button
              className="p-2 w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
              onClick={chooseRandomTackle}
            >
              Help me pick!
            </button>

            {luckyTackle !== '' && (
              <ContentSection
                title="You should use..."
                content={luckyTackle}
                isExpandedByDefault={true}
              ></ContentSection>
            )}

            <ContentSection
              title="Lures and rigs to use"
              content={data.tackle.map((t, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex flex-row items-center justify-between space-x-2">
                    <div className="flex flex-row items-center basis-2/3">
                      {t.tip && (
                        <button
                          className="flex flex-row items-center text-left w-full"
                          title="Click to learn how to use this"
                          onClick={() => {
                            setModalContent(t.tip)
                            setIsModalOpen(true)
                          }}
                        >
                          <span className="sm:break-words break-all">
                            {t.name}
                          </span>
                          <FontAwesomeIcon
                            icon={faCircleQuestion}
                            className="ml-2"
                          />
                        </button>
                      )}
                      {!t.tip && <p>{t.name}</p>}
                    </div>
                    {!t.name.toUpperCase().includes('RIG') && (
                      <div>
                        <a
                          title={
                            'Amazon Buy link for ' + t.name + ' fishing lures'
                          }
                          target="_blank"
                          className="p-2 block w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md flex flex-row items-center"
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
              isExpandedByDefault={true}
            ></ContentSection>
          </div>
        )}
      </div>

      {message.message !== '' && (
        <Message
          message={message.message}
          severity={message.severity}
        ></Message>
      )}

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
  )
}
