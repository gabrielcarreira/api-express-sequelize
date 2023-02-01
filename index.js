import express, { response } from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.json({ limit: '1mb' }))
app.use(
  bodyParser.urlencoded({
    limit: '1mb',
    extended: true
  })
)

app.get('/api', (request, response) => {
  response.json('On-line')
})

app.listen('3000', () => {
  console.log('API On-line')
})
