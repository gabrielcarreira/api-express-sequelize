import Client from './client.js'

export async function searchClient(id) {
  const clients = await Client.findAll({
    where: {
      id: id
    }
  })

  return clients[0]
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
      email: email,
  });

  console.log(newClient);
}