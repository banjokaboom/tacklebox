import { sql } from '@vercel/postgres'
import Recipe from '@/app/classes/Recipe'

export default async function handler(req: any, res: any) {
  let retryCount = 0
  try {
    const result = await sql`SELECT * from recipes`
    let recipes: Recipe[] = []

    result.rows.map((r) => {
      recipes.push({
        name: r.name,
        seasons: r.seasons,
        frequency: r.frequency,
        ingredients: r.ingredients,
      })
    })

    res.json({ recipes })
  } catch (error) {
    console.error(error)
    if (retryCount < 3) {
      retryCount++
      handler(req, res)
    }
  }
}
