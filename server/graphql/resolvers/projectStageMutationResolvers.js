import Project from '../../models/Project.js'
import ProjectStage from '../../models/ProjectStage.js'
import ProjectStep from '../../models/ProjectStep.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const projectStageMutationResolvers = {

  addProjectStage: async (_, args, context) => {
    checkAuth(context)
    try {
      const newStage = await ProjectStage.create({
        ...args.data,
        userId: context.user._id
      })

      const project = await Project.findById(newStage.projectId)
      project.stages.push(newStage._id)
      await project.save()

      return newStage
    } catch (error) {
      throwServerError()
    }
  },

  deleteProjectStage: async (_, args, context) => {
    checkAuth(context)
    try {
      const stage = await ProjectStage.findById(args.id)
      checkUserId(stage, context)
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
      throwServerError()
    }
  },

  updateProjectStage: async (_, args, context) => {
    checkAuth(context)
    try {
      const projectStageId = args.data._id
     const stage = await ProjectStage.findById(projectStageId)
     checkUserId(stage)
      const updatedProjectStage = await ProjectStage.findByIdAndUpdate(projectStageId, args.data, {
        new: true,
      })
      return updatedProjectStage
    } catch (error) {
      throwServerError()
    }
  },
}

export default projectStageMutationResolvers
