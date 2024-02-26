import EventType from '../../models/EventType.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const eventTypeMutationResolvers = {

  addEventType: async (_, args, context) => {
    checkAuth(context)
    try {
      const newEventType = await EventType.create({
        ...args.data,
        userId: context.user._id
      })
      return newEventType
    } catch (error) {
      throwServerError()
    }
  },

  deleteEventType: async (_, args, context) => {
    checkAuth(context)
    try {
      const event = await EventType.findById(args.id)
      checkUserId(event, context)
      await EventType.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updateEventType: async (_, args, context) => {
    checkAuth(context)
    try {
      const eventTypeId = args.data._id
      const eventType = await EventType.findById(eventTypeId)
      checkUserId(eventType, context)
      const updatedEventType = await EventType.findByIdAndUpdate(eventTypeId, args.data, {
        new: true,
      })
      return updatedEventType
    } catch (error) {
      throwServerError()
    }
  },
}

export default eventTypeMutationResolvers
