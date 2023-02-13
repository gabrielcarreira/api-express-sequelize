import express, { response } from 'express'
import bodyParser from 'body-parser'
import {
  searchClient,
  createClient,
  searchClientsByName,
  getAllClients
} from './models/dbFunctions.js'
import helmet from 'helmet'
import cors from 'cors'
import joi from 'joi'
import queryString from 'query-string'

const app = express()
app.use(helmet())
app.use(cors())

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

app.get('/client/name/:first_name', async (request, response) => {
  const first_name = request.params.first_name

  const clients = await searchClientsByName(first_name)
  if (clients.length === 0)
    return response.status(404).json({ error: 'Nenhum cliente encontrado' })
  return response.json(clients)
})

app.get('/clients', async (request, response) => {
  const page = request.query.page ? parseInt(request.query.page) : 1
  const limit = request.query.limit ? parseInt(request.query.limit) : 10

  const clients = await getAllClients(page, limit)
  if (clients.length === 0)
    return response
      .status(404)
      .json({ error: 'Nenhum cliente encontrado na página' })
  return response.json({ page: page, total: clients.length, clients })
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

app.listen('8080', () => {
  console.log('API On-line')
})
