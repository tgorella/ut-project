import Client from '../../models/Client.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const clientQueryResolvers = {
  clients: async (_, __, context) => {
    checkAuth(context)
    try {
      const clients = await Client.find({ userId: context.user._id })
      return clients
    } catch (error) {
      throwServerError()
    }
  },
  client: async (_, args, context) => {
    checkAuth(context)
    try {
      const client = await Client.findById(args.id)
      checkUserId(client, context)
      return client
    } catch (error) {
      throwServerError()
    }
  },
  filteredClients: async (_, args, context) => {
    checkAuth(context)
   const search = new RegExp(args.data, "i")
    try {
      const list = await Client.find({ userId: context.user._id,}).or([{email: search}, {name: search}, {phone: search}])

      return list
    } catch (error) {
      throwServerError()
    }
  },
}

export default clientQueryResolvers
