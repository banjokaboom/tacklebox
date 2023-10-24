import { sql } from '@vercel/postgres'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from styles order by name asc`
    let styles: any[] = []

    result.rows.map((s) => {
      styles.push({
        name: s.name,
        confidence: s.confidence,
        species: s.species,
        type: s.type,
      })
    })

    res.json({ styles })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
