import { compareDates } from '../helpers/date'

class Regulations {
  public freshwaterRegulations: object[]
  public freshwaterRegulationsLink: string
  public saltwaterRegulations: object[]
  public saltwaterRegulationsLink: string
}

async function getData() {
  let data = await getMARegulations()

  return data
}

async function getMARegulations() {
  let canIFish = false
  let regulations = new Regulations()

  await fetch('http://localhost:5555/canifish/freshMA')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      let fishingRegulations: object[] = []

      data.fishingData.forEach((regulation) => {
        let dates = regulation.seasonDates

        if (typeof dates == 'object') {
          dates.forEach((date) => {
            if (compareDates(date)) {
              fishingRegulations.push(regulation)

              if (!canIFish) {
                canIFish = true
              }
            }
          })
        } else {
          if (compareDates(dates)) {
            fishingRegulations.push(regulation)

            if (!canIFish) {
              canIFish = true
            }
          }
        }
      })

      if (canIFish) {
        regulations.freshwaterRegulations = fishingRegulations
        regulations.freshwaterRegulationsLink = data.regulationsLink
      }
    })

  await fetch('http://localhost:5555/canifish/saltMA')
    .then((res) => res.json())
    .then((data) => {
      let fishingRegulations: object[] = []

      data.fishingData.forEach((regulation) => {
        let dates = regulation.seasonDates

        if (typeof dates == 'object') {
          dates.forEach((date) => {
            if (compareDates(date)) {
              fishingRegulations.push(regulation)

              if (!canIFish) {
                canIFish = true
              }
            }
          })
        } else {
          if (compareDates(dates)) {
            fishingRegulations.push(regulation)

            if (!canIFish) {
              canIFish = true
            }
          }
        }
      })

      if (canIFish) {
        regulations.saltwaterRegulations = fishingRegulations
        regulations.saltwaterRegulationsLink = data.regulationsLink
      }
    })
    .catch((err) => {
      console.error(err)
    })

  return regulations
}

export default async function CanIFish() {
  const data = await getData()
  console.log(data)
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl">
          Can I Fish:{' '}
          {data.freshwaterRegulations.length > 0 ||
          data.saltwaterRegulations.length > 0
            ? 'Yes'
            : 'No'}
        </h1>
        <div className="flex flex-col lg:flex-row justify-between">
          <div>
            <h2 className="text-2xl pb-8 pt-8">Freshwater Regulations</h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md max-w-[50%]">
              {data.freshwaterRegulations.map((f) => (
                <div key={f.species}>
                  <p className="pb-4">{f.species}</p>
                  <p className="pb-4">Description: {f.description}</p>
                  <p className="pb-4">Fishing dates: {f.seasonDates}</p>
                  <p className="pb-8">Creel limit: {f.seasonLimits}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl pb-8 pt-8">Saltwater Regulations</h2>
            <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
              {data.saltwaterRegulations.map((s) => (
                <div key={s.species}>
                  <p className="pb-4">{s.species}</p>
                  <p className="pb-4">Description: {s.description}</p>
                  <p className="pb-4">Fishing dates: {s.seasonDates}</p>
                  <p className="pb-8">Creel limit: {s.seasonLimits}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
