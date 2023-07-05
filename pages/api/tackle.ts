import { sql } from '@vercel/postgres'
import { Tackle } from '@/app/what-to-fish/useFishingData'

export default async function handler(req: any, res: any) {
  const result = await sql`SELECT * from tackle`
  let tackle: Tackle[] = []

  result.rows.map((t) => {
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
}
