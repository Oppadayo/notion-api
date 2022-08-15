const express = require('express')
const {Client} = require('@notionhq/client')
const cors = require('cors')
require('dotenv').config()

const app = express()

const database_id = process.env.DATABASE_ID

app.use(cors())

const notion = new Client({auth: process.env.NOTION_API_KEY})

app.listen(process.env.PORT || 3000, () => console.log('start server localhost:3000'))

//middleware
app.use(express.json()) //transforma tudo para json

async function getDatabase(){
  const database = await notion.databases.query(
    {
      database_id: database_id      
    }
  )
  return database
}

app.get('/database', async (request, response) => {
  const database = await getDatabase()
  response.json(database)
}
)
