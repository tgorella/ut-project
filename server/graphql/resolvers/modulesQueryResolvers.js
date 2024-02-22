import ModulesStatus from '../../models/ModulesStatus.js'

import { GraphQLError } from 'graphql';


const modulesStatusQueryResolvers = {
  modules: async (_, args) => {
    try {
      const statuses = await ModulesStatus.find({userId: args.userId})
      return statuses
    } catch (error) {
      throw new GraphQLError(error)
    }
  }
}

export default modulesStatusQueryResolvers