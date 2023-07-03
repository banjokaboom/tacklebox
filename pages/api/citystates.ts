import { sql } from '@vercel/postgres'
import { CityState } from '../../app/what-to-fish/useFishingData'

export default async function handler(req, res) {
  const result = await sql`SELECT * from citystates`
  let citystates: CityState[] = []

  result.rows.map((cs) => {
    citystates.push({
      state: cs.state,
      capital: cs.capital,
      location: cs.location,
    })
  })

  res.json({ citystates })
}
