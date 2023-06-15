import Nav from '../nav'

class OilPriceData {
  public price: string
  public company: string
  public url: string
  public oilPrices: object[]
}

async function getOilPrices() {
  const res = await fetch('http://localhost:5555/api/oilprices')

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-cyan-600 mx-auto">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl">Oil Prices</h1>

        <h2 className="text-xl pb-8 pt-8">Best Price</h2>
        <p className="pb-4">Price: {data.price}</p>
        <p className="pb-4">Company: {data.company}</p>
        <a className="pb-4" href={data.url} target="_blank">
          Buy
        </a>

        <Nav></Nav>
      </div>
    </main>
  )
}
