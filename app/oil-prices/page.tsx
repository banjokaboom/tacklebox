class OilPriceData {
  public price: string
  public company: string
  public url: string
  public oilPrices: object[]
}

async function getOilPrices() {
  const res = await fetch('http://localhost:5555/api/oilprices', {
    cache: 'no-store',
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getData() {
  let oilPriceData = new OilPriceData()

  const data = await getOilPrices()

  ;(oilPriceData.price = '$' + data.price),
    (oilPriceData.company = data.company),
    (oilPriceData.url = data.url),
    (oilPriceData.oilPrices = data.allOilPrices)

  return data
}

export default async function OilPrices() {
  const data = await getData()

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl">Oil Prices</h1>

        <h2 className="text-2xl pb-8 pt-8">Best Price</h2>
        <div className="border border-slate-50 bg-slate-700 p-4 rounded-md flex flex-col lg:items-center justify-between">
          <h3 className="pb-4 text-2xl">Price: {data.price}</h3>
          <p className="pb-4">Company: {data.company}</p>
          <a
            className="p-2 block w-fit bg-amber-600 hover:bg-slate-50 hover:text-slate-700 rounded-md"
            href={data.url}
            target="_blank"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
  )
}
