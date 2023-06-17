import { compareDates } from '../../helpers/date'

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

  await fetch('http://localhost:5555/canifish/freshMA', { cache: 'no-store' })
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
        regulations.freshwaterRegulations = fishingRegulations
        regulations.freshwaterRegulationsLink = data.regulationsLink
      }
    })

  await fetch('http://localhost:5555/canifish/saltMA', { cache: 'no-store' })
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

function getCreelLimitForIndex(seasonLimits, index) {
  if (seasonLimits[index]) {
    if (seasonLimits[index].trim() == '') {
      let i = index
      while (i > 0) {
        i--
        if (seasonLimits[i].trim() !== '') {
          return seasonLimits[i]
        }
      }
    } else {
      return seasonLimits[index].trim()
    }
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

export default async function CanIFish() {
  const data = await getData()

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl pb-4">
          Can I Fish:{' '}
          {data.freshwaterRegulations.length > 0 ||
          data.saltwaterRegulations.length > 0
            ? 'Yes'
            : 'No'}
        </h1>
        <hr />
        <div>
          <h2 className="text-2xl pb-8 pt-8">Freshwater Regulations</h2>
          <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
            {data.freshwaterRegulations.map((f: object, fIndex: number) => (
              <div key={fIndex} className="pb-8">
                <h3 className="pb-4 text-xl">{f.species}</h3>
                <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                  {f.description.trim() !== f.species.trim() && (
                    <p className="pb-4">{f.description}</p>
                  )}
                  <p className="pb-4">Fishing dates:</p>
                  <div>
                    {f.seasonDates.map((sd: string, sdIndex: number) => (
                      <p key={sdIndex} className="indent-4">
                        {sd.replace(', ', '').trim()}, Limit:{' '}
                        {getCreelLimitForIndex(f.seasonLimits, sdIndex)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div>
          <h2 className="text-2xl pb-8 pt-8">Saltwater Regulations</h2>
          <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
            {data.saltwaterRegulations.map((s, sIndex) => (
              <div key={sIndex} className="pb-8">
                <h3 className="pb-4 text-xl">{s.species}</h3>
                <div className="border border-slate-50 bg-slate-700 p-4 rounded-md">
                  {s.description.trim() !== s.species.trim() && (
                    <p className="pb-4">{s.description}</p>
                  )}
                  <p className="pb-4">Fishing dates:</p>
                  <div>
                    {s.seasonDates.map((sd: string, sdIndex: number) => (
                      <p key={sdIndex} className="indent-4">
                        {sd.replace(', ', '').trim()}, Limit:{' '}
                        {getCreelLimitForIndex(s.seasonLimits, sdIndex)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
