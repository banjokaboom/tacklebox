import { sql } from '@vercel/postgres'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from colors order by name asc`
    let colors: any[] = []

    result.rows.map((c) => {
      colors.push({
        name: c.name,
        confidence: c.confidence,
        waterClarity: c.water_clarity,
        type: c.type,
        weather: c.weather,
      })
    })

    res.json({ colors })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
