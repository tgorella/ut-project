import ProjectStep from '../../models/ProjectStep.js'
import ProjectStage from '../../models/ProjectStage.js'
import Project from '../../models/Project.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const projectMutationResolvers = {
  addProject: async (_, args, context) => {
    checkAuth(context)
    try {
      const newProject = await Project.create({
        ...args.data,
        userId: context.user._id,
      })

      return newProject
    } catch (error) {
      throwServerError()
    }
  },

  deleteProject: async (_, args, context) => {
    checkAuth(context)
    try {
      const removedProject = await Project.findById(args.id)
      checkUserId(removedProject, context)
      const stages = await ProjectStage.find({ projectId: args.id })
      stages.forEach(async (stage) => {
        await ProjectStep.deleteMany({ stageId: stage._id })
      })
      await ProjectStage.deleteMany({ projectId: args.id })
      await Project.deleteOne({ _id: args.id })
      return removedProject._id
    } catch (error) {
      throwServerError()
    }
  },
  updateProject: async (_, args, context) => {
    checkAuth(context)
    try {
      const projectId = args.data._id
      const project = await Project.findById(projectId)
      checkUserId(project, context)
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        args.data,
        {
          new: true,
        }
      )
      return updatedProject
    } catch (error) {
      throwServerError()
    }
  },
}

export default projectMutationResolvers
