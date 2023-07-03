require('dotenv').config()
// eslint-disable-next-line
const postgres = require('@vercel/postgres')

async function importToPostgres() {
  //   const tackle = Array.from(tackleJSON.tackle)
  //   const cityStates = Array.from(cityStateJSON.cityStates)
  //   const recipes = Array.from(recipesJSON.recipes)
  //   recipes.forEach(async (r) => {
  //     await postgres.sql`INSERT INTO recipes (name,season,frequency,ingredients) VALUES(${r.name},(${r.seasons}),${r.frequency},(${r.ingredients}))`
  //   })
}

importToPostgres()
