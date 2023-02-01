import db from './db.js'
import Client from './client.js'

async function searchClient(id) {
  const clients = await Client.findAll({
    where: {
      id: id
    }
  })

  return clients[0]
}

async function createClient(first_name, last_name, email) {
  const newClient = await Client.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
  });

  console.log(newClient);
}

export { searchClient, createClient }