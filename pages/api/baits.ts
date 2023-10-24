import { sql } from '@vercel/postgres'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from baits order by name asc`
    let baits: any[] = []

    result.rows.map((b) => {
      baits.push({
        name: b.name,
        confidence: b.confidence,
        species: b.species,
        type: b.type,
      })
    })

    res.json({ baits })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
