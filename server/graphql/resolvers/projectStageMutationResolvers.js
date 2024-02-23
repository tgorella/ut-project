import { GraphQLError } from 'graphql'
import Project from '../../models/Project.js'
import ProjectStage from '../../models/ProjectStage.js'
import ProjectStep from '../../models/ProjectStep.js'

const projectStageMutationResolvers = {
  addProjectStage: async (_, args) => {
    try {
      const newStage = await ProjectStage.create({
        ...args.data,
      })

      const project = await Project.findById(newStage.projectId)
      project.stages.push(newStage._id)
      await project.save()

      return newStage
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteProjectStage: async (_, args) => {
    try {
      const stage = await ProjectStage.findById(args.id)
      const project = await Project.findById(stage.projectId)
      await ProjectStep.deleteMany({stageId: args.id})
      await ProjectStage.deleteOne({_id: args.id})
      
      project.stages.pull(stage._id)
      await project.save()
      
      const result =  { 
        stage: stage._id, 
        project: stage.projectId
      }
      return result
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateProjectStage: async (_, args) => {
    try {
      const projectStageId = args.data._id
      // if (userId === req.user._id) {
      const updatedProjectStage = await ProjectStage.findByIdAndUpdate(projectStageId, args.data, {
        new: true,
      })
      return updatedProjectStage
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default projectStageMutationResolvers
