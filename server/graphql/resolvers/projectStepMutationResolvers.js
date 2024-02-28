import ProjectStep from '../../models/ProjectStep.js'
import ProjectStage from '../../models/ProjectStage.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const projectStepMutationResolvers = {
  addProjectStep: async (_, args, context) => {
    checkAuth(context)
    try {
      const newStep = await ProjectStep.create({
        ...args.data,
        userId: context.user._id
      })
      const stage = await ProjectStage.findById(newStep.stageId)
      stage.steps.push(newStep._id)
      stage.save()

      return newStep
    } catch (error) {
      throwServerError()
    }
  },

  deleteProjectStep: async (_, args, context) => {
    checkAuth(context)
    try {
      const step = await ProjectStep.findById(args.id)
      checkUserId(step, context)
      await ProjectStep.deleteOne({ _id: args.id })

      const stage = await ProjectStage.findById(step.stageId)
      stage.steps.pull(step._id)
      stage.save()

      const result =  {
        step:step._id, 
        stage: step.stageId, 
        project: step.projectId
      }
      return result
    } catch (error) {
      throwServerError()
    }
  },

  updateProjectStep: async (_, args, context) => {
    checkAuth(context)
    try {
      const projectStepId = args.data._id
      const step = await ProjectStep.findById(projectStepId)
      checkUserId(step, context)
      const updatedProjectStep = await ProjectStep.findByIdAndUpdate(projectStepId, args.data, {
        new: true,
      })
      return updatedProjectStep
    } catch (error) {
      throwServerError()
    }
  },
}

export default projectStepMutationResolvers
