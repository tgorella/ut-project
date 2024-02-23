import { GraphQLError } from 'graphql'
import ProjectStep from '../../models/ProjectStep.js'
import ProjectStage from '../../models/ProjectStage.js'
import Project from '../../models/Project.js'

const projectMutationResolvers = {
  addProject: async (_, args) => {
    try {
      const newProject = await Project.create({
        ...args.data,
      })

      return newProject
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteProject: async (_, args) => {
    try {
      const removedProject = await Project.findById(args.id)
      // if (removedProject.userId.toString() === req.user._id) {
        const stages = await ProjectStage.find({projectId: args.id})
        stages.forEach(async (stage) => {
          await ProjectStep.deleteMany({stageId: stage._id})
        })
        await ProjectStage.deleteMany({projectId: args.id})
        await Project.deleteOne({_id: args.id})
return removedProject._id
      // }
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateProject: async (_, args) => {
    try {
      const projectId = args.data._id
      // if (userId === req.user._id) {
      const updatedProject = await Project.findByIdAndUpdate(projectId, args.data, {
        new: true,
      })
      return updatedProject
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default projectMutationResolvers
