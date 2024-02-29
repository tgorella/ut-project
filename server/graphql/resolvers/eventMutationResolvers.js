import Event from '../../models/Event.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const eventMutationResolvers = {

  addEvent: async (_, args, context) => {
    checkAuth(context)
    try {

      const newEvent = await Event.create({
        ...args.data,
        userId: context.user._id,
      })
      
      await newEvent.populate({
        path: 'eventType'
      })

      return newEvent
    } catch (error) {
      throwServerError()
    }
  },

  deleteEvent: async (_, args, context) => {
    checkAuth(context)
    try {
      const event = await Event.findById(args.id)
      checkUserId(event, context)
      await Event.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updateEvent: async (_, args, context) => {
    checkAuth(context)
    const id = args.data._id
    const newData = args.data
    delete newData._id
    
    try {
      const event = await Event.findById(id)
      checkUserId(event, context)
      const updatedEvent = await Event.findByIdAndUpdate(id, newData, {
        new: true,
      })
      
      await updatedEvent.populate({
        path: 'eventType'
      })

      return updatedEvent
    } catch (error) {
      throwServerError()
    }
  },
}

export default eventMutationResolvers
