import ModulesStatus from '../../models/ModulesStatus.js'
import { checkAuth, throwServerError } from './helpers.js';


const modulesStatusQueryResolvers = {
  modules: async (_, __, context) => {
    checkAuth(context)
    try {
      const statuses = await ModulesStatus.find({userId: context.user._id})
      return statuses
    } catch (error) {
      throwServerError()
    }
  }
}

export default modulesStatusQueryResolvers