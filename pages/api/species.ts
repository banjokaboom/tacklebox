import { sql } from '@vercel/postgres'

export default async function handler(req: any, res: any) {
  const result = await sql`SELECT * from species`
  let species: string[] = []

  result.rows.map((s) => {
    species.push(s.name)
  })

  res.json({ species })
}
