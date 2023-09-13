import { sql } from '@vercel/postgres'
import Tackle from '@/app/classes/Tackle'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  let species = req.query.species
  try {
    let result: any = null

    if (species) {
      console.log('Loading specific tackle for species ' + species)
      result =
        await sql`SELECT * from tackle where ${species} = ANY(species) order by name asc`
    } else {
      result = await sql`SELECT * from tackle order by name asc`
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
        weather: t.weather,
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
