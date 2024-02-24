import Project from '../../models/Project.js';
import ProjectStage from '../../models/ProjectStage.js';
import ProjectStep from '../../models/ProjectStep.js';
import { checkAuth, checkUserId, throwServerError } from './helpers.js';



const projectQueryResolvers = {
  projects: async (_, __, context) => {
    checkAuth(context)
    try {
      const projects = await Project.find({userId: context.user._id}).populate({
        path: "stages",
        populate: {path: "steps"}
      })
      return projects
    } catch (error) {
      throwServerError()
    }
  },

  project: async (_, args, context) => {
    checkAuth(context)
    try {
      const project = await Project.findById(args.id).populate({
        path: "stages",
        populate: {path: "steps"}
      }
     )
      checkUserId(project, context)
      return project
    } catch (error) {
      throwServerError()
    }
  }
}

export default projectQueryResolvers