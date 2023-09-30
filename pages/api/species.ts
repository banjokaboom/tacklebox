import { sql } from '@vercel/postgres'
import Species from '@/app/classes/Species'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from species order by name asc`
    let species: Species[] = []

    result.rows.map((s) => {
      species.push(new Species(s.name, s.water_type))
    })

    res.json({ species })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
