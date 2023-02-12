import express, { response } from 'express'
import bodyParser from 'body-parser'
import { searchClient, createClient } from './models/dbFunctions.js'
import helmet from 'helmet'
import joi from 'joi'

const app = express()
app.use(helmet())

app.use(bodyParser.json({ limit: '1mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '1mb',
    extended: true
  })
)

const clientSchema = joi.object().keys({
  first_name: joi.string().min(1).max(100).required(),
  last_name: joi.string().min(1).max(100).required(),
  email: joi.string().email().required()
})

app.get('/client/:id', async (request, response) => {
  const client = await searchClient(request.params.id)
  return response.json(client)
})

app.post('/client', async (request, response) => {
  const result = joi.validate(request.body, clientSchema)
  if (result.error) {
    return response.status(400).json({ error: result.error.message })
  }

  const { first_name, last_name, email } = request.body
  const client = await createClient(first_name, last_name, email)
  return response.json(client)
})

app.listen('3000', () => {
  console.log('API On-line')
})
