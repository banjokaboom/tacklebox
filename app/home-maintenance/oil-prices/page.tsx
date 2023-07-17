'use client'

import { useState, useEffect } from 'react'
import Loader from '@/app/components/loader'
import ContentSection from '@/app/components/content'
import Message from '@/app/components/message'
import MessageData from '@/app/classes/MessageData'
import Breadcrumbs from '@/app/components/breadcrumbs'
import OilPriceData from '@/app/classes/OilPriceData'

export default function OilPrices() {
  let [data, setData] = useState(new OilPriceData())
  let [zone, setZone] = useState(Math.floor(Math.random() * 15) + 1 + '')
  let [message, setMessage] = useState(new MessageData())
  let breadcrumbs = [
    {
      title: 'Home Maintenance',
      href: '/home-maintenance',
    },
    {
      title: 'Heating Oil Prices (MA)',
      href: '/home-maintenance/oil-prices',
    },
  ]

  useEffect(() => {
    let m = new MessageData()
    setMessage(new MessageData())

    async function getOilPrices() {
      const res = await fetch('/api/oilprices?zone=' + zone, {
        cache: 'no-store',
      })

      return res.json()
    }

    async function getData() {
      setData(new OilPriceData())
      let oilPriceData = new OilPriceData()

      try {
        const data = await getOilPrices()

        oilPriceData.price = '$' + data.price
        oilPriceData.company = data.company
        oilPriceData.url = data.url
        oilPriceData.oilPrices = data.allOilPrices

        if (!isDataLoaded) {
          m.message = 'Successfully loaded oil prices for zone: ' + zone
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

    let isDataLoaded = false

    getData()

    return () => {
      isDataLoaded = true
    }
  }, [zone])

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <Breadcrumbs links={breadcrumbs} />
        <h1 className="text-3xl mb-4">Heating Oil Prices</h1>
        <hr className="mb-4" />
        <div className="mb-4">
          <p className="mb-4">
            Don&apos;t know your zone? Go to{' '}
            <a
              href="https://www.newenglandoil.com/mass.htm"
              target="_blank"
              className="underline hover:no-underline hover:tracking-wide transition-[letter-spacing]"
            >
              newenglandoil.com
            </a>{' '}
            to find out!
          </p>
          <label htmlFor="state" className="mb-4 block">
            Zone
          </label>
          <select
            name="zone"
            id="zone"
            onChange={(e) => {
              setZone(e.target.value)
            }}
            className="text-slate-700 leading-4 p-2 block max-w-full"
            value={zone}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
          </select>
        </div>
        {data.price == '' && <Loader />}
        {data.price !== '' && (
          <div>
            <ContentSection
              title="Best Price"
              content={
                <div>
                  <p className="mb-4 text-2xl">Price: {data.price}</p>
                  <p className="mb-4">Company: {data.company}</p>
                  <a
                    className="p-2 block w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
                    href={data.url}
                    target="_blank"
                  >
                    Buy
                  </a>
                </div>
              }
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
    </div>
  )
}
