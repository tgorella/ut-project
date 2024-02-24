import Client from '../../models/Client.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const clientMutationResolvers = {

  addClient: async (_, args, context) => {
   checkAuth(context)
    try {
      const newClient = await Client.create({
        ...args.data,
        userId: context.user._id
      })
      return newClient
    } catch (error) {
      throwServerError()
    }
  },

  deleteClient: async (_, args, context) => {
    checkAuth(context)
    try {
      const client = await Client.findById(args.id)
      checkUserId(client, context)
      await Client.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updateClient: async (_, args, context) => {
    checkAuth(context)
    try {
      const clientId = args.data._id
      const client = await Client.findById(clientId)
      checkUserId(client, context)
      const updatedClient = await Client.findByIdAndUpdate(clientId, args.data, {
        new: true,
      })
      return updatedClient
    } catch (error) {
      throwServerError()
    }
  },
}

export default clientMutationResolvers
