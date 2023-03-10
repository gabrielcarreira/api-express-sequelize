import Client from './client.js'

export async function getAllClients(page, pageSize) {
  const offset = (page - 1) * pageSize

  const clients = await Client.findAll({
    limit: pageSize,
    offset: offset,
    order: [['createdAt', 'ASC']]
  })

  return clients
}

export async function searchClient(id) {
  const clients = await Client.findByPk(id)

  return clients
}

export async function searchClientsByName(first_name) {
  const clients = await Client.findAll({
    where: {
      first_name: first_name
    }
  })

  return clients
}

export async function createClient(first_name, last_name, email) {
  const newClient = await Client.create({
    first_name: first_name,
    last_name: last_name,
    email: email
  })
}

export async function updateClient(id, first_name, last_name, email) {
  const client = await Client.findByPk(id)

  await client.update({
    first_name: first_name,
    last_name: last_name,
    email: email
  })

  return client
}
