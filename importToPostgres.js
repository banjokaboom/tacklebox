require('dotenv').config()
// eslint-disable-next-line
const postgres = require('@vercel/postgres')
const tackleJSON = require('./__tests__/mockData/tackle.json')

async function importToPostgres() {
  const tackle = Array.from(tackleJSON.tackle)
  //   const cityStates = Array.from(cityStateJSON.cityStates)
  //   const recipes = Array.from(recipesJSON.recipes)
  tackle.forEach(async (t) => {
    await postgres.sql`INSERT INTO tackle (name,confidence,species,watertemp,depth,type,tip) VALUES(${t.name},${t.confidence},${t.species},${t.waterTemp},${t.depth},${t.type},${t.tip}) ON CONFLICT DO NOTHING`
  })
}

importToPostgres()
