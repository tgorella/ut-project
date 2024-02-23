import { GraphQLError } from 'graphql'
import EventType from '../../models/EventType.js'

const eventTypeMutationResolvers = {
  addEventType: async (_, args) => {
    try {
      const newEventType = await EventType.create({
        ...args.data,
      })
      return newEventType
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteEventType: async (_, args) => {
    try {
      await EventType.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateEventType: async (_, args) => {
    try {
      const eventTypeId = args.data._id
      // if (userId === req.user._id) {
      const updatedEventType = await EventType.findByIdAndUpdate(eventTypeId, args.data, {
        new: true,
      })
      return updatedEventType
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default eventTypeMutationResolvers
