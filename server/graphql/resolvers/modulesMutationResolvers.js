import { GraphQLError } from 'graphql'
import ModulesStatus from '../../models/ModulesStatus.js'
import { checkAuth, throwServerError } from './helpers.js'

const modulesMutationResolvers = {

  addModules: async (_, __, context) => {
    checkAuth(context)
    try {
      const newModulesStatus = await ModulesStatus.create({
        userId: context.user._id,
        clients: true,
        orders: true,
        calendar: true,
        workflow: true,
        projects: true,
      })

      return newModulesStatus
    } catch (error) {
     throwServerError()
    }
  },

  updateModules: async (_, args, context) => {
    checkAuth(context)
    try {
      const modules = await ModulesStatus.find({userId: context.user._id})
      const updatedModuleStatus = await ModulesStatus.findByIdAndUpdate(
        modules._id,
        args.data,
        {
          new: true,
        }
      )
      return updatedModuleStatus
    } catch (error) {
     throwServerError()
    }
  },
}

export default modulesMutationResolvers
