import Client from '../../models/Client.js'
import { GraphQLError } from 'graphql'

const clientQueryResolvers = {
  clients: async () => {
    try {
      const clients = await Client.find()
      return clients
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  client: async (_, args) => {
    try {
      const client = await Client.findById(args.id)
      return client
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  filteredClients: async (_, args) => {
    try {
      const list = await Client.find()
      const filteredList = list.filter((item) => {
        return (
          item.name.toLowerCase().includes(args.data.toLowerCase()) ||
          item.email
            .toLocaleLowerCase()
            .includes(args.data.toLocaleLowerCase()) ||
          item.phone.includes(args.data)
        )
      })
      return filteredList
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default clientQueryResolvers
