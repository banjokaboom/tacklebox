import { sql } from '@vercel/postgres'
import CityState from '@/app/classes/CityState'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from citystates order by state asc`
    let cityStates: CityState[] = []

    result.rows.map((cs) => {
      cityStates.push({
        state: cs.state,
        capital: cs.capital,
        location: cs.location,
      })
    })

    res.json({ cityStates })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
