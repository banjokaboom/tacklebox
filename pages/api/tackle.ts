import { sql } from '@vercel/postgres'
import Tackle from '@/app/classes/Tackle'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    let result: any = null

    if (req.query.species) {
      result =
        await sql`SELECT * from tackle where ${req.query.species} = ANY(species)`
    } else {
      result = await sql`SELECT * from tackle`
    }

    let tackle: Tackle[] = []

    result.rows.map((t: any) => {
      tackle.push({
        name: t.name,
        confidence: t.confidence,
        species: t.species,
        waterTemp: t.watertemp,
        depth: t.depth,
        type: t.type,
        tip: t.tip,
      })
    })

    res.json({ tackle })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
