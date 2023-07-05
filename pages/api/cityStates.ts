import { sql } from '@vercel/postgres'
import { CityState } from '@/app/what-to-fish/useFishingData'

export default async function handler(req: any, res: any) {
  const result = await sql`SELECT * from citystates`
  let cityStates: CityState[] = []

  result.rows.map((cs) => {
    cityStates.push({
      state: cs.state,
      capital: cs.capital,
      location: cs.location,
    })
  })

  res.json({ cityStates })
}
