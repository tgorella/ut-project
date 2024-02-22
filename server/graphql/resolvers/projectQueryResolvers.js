import { GraphQLError } from 'graphql';
import Project from '../../models/Project.js';
import ProjectStage from '../../models/ProjectStage.js';
import ProjectStep from '../../models/ProjectStep.js';



const projectQueryResolvers = {
  projects: async () => {
    try {
      const projects = await Project.find().populate({
        path: "stages",
        populate: {path: "steps"}
      })
      return projects
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  project: async (_, args) => {
    try {
      const project = await Project.findById(args.id).populate({
        path: "stages",
        populate: {path: "steps"}
      }
     )
      // order.userId = await getUser(order.userId)
      return project
    } catch (error) {
      throw new GraphQLError(error)
    }
  }
}

export default projectQueryResolvers