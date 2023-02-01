import express, { response } from 'express'
import bodyParser from 'body-parser'
import { searchClient, createClient } from './models/dbFunctions.js'

const app = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '1mb',
    extended: true
  })
)

app.get('/client/:id', async (request, response) => {
  const client = await searchClient(request.params.id)
  response.json(client)
})

app.listen('3000', () => {
  console.log('API On-line')
})
