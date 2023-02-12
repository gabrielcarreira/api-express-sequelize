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
  const id = request.params.id

  if (!Number.isInteger(parseInt(id)) || id <= 0)
    return response.status(400).json({ error: 'Id inválido' })

  const client = await searchClient(id)
  if (!client)
    return response.status(404).json({ error: 'Cliente não encontrado' })
  return response.json(client)
})

app.post('/client', async (request, response) => {
  const result = clientSchema.validate(request.body)
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
