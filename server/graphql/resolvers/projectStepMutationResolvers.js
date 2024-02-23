import { GraphQLError } from 'graphql'
import ProjectStep from '../../models/ProjectStep.js'
import ProjectStage from '../../models/ProjectStage.js'

const projectStepMutationResolvers = {
  addProjectStep: async (_, args) => {
    try {
      const newStep = await ProjectStep.create({
        ...args.data,
      })

      const stage = await ProjectStage.findById(newStep.stageId)
      stage.steps.push(newStep._id)
      stage.save()

      return newStep
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteProjectStep: async (_, args) => {
    try {
      const step = await ProjectStep.findById(args.id)
      const deletedStep = await ProjectStep.deleteOne({ _id: args.id })

      const stage = await ProjectStage.findById(step.stageId)
      stage.steps = stage.steps.filter((item) => item !== deletedStep._id)
      stage.save()

      const result =  {
        step:step._id, 
        stage: step.stageId, 
        project: step.projectId
      }
      return result
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateProjectStep: async (_, args) => {
    try {
      const projectStepId = args.data._id
      // if (userId === req.user._id) {
      const updatedProjectStep = await ProjectStep.findByIdAndUpdate(projectStepId, args.data, {
        new: true,
      })
      return updatedProjectStep
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default projectStepMutationResolvers
