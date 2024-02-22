import { GraphQLError } from 'graphql'
import Client from '../../models/Client.js'

const clientMutationResolvers = {
  addClient: async (_, args) => {
    try {
      const newClient = await Client.create({
        ...args.data,
      })
      return newClient
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteClient: async (_, args) => {
    try {
      await Client.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateClient: async (_, args) => {
    try {
      const clientId = args.data._id
      // if (userId === req.user._id) {
      const updatedClient = await Client.findByIdAndUpdate(clientId, args.data, {
        new: true,
      })
      return updatedClient
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default clientMutationResolvers
