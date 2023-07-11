import { sql } from '@vercel/postgres'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from species order by name asc`
    let species: string[] = []

    result.rows.map((s) => {
      species.push(s.name)
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
