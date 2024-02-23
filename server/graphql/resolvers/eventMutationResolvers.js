import { GraphQLError } from 'graphql'
import Event from '../../models/Event.js'

const eventMutationResolvers = {
  addEvent: async (_, args) => {
    try {
      const newEvent = await Event.create({
        ...args.data,
      })
      return newEvent
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteEvent: async (_, args) => {
    try {
      await Event.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateEvent: async (_, args) => {
    try {
      const eventId = args.data._id
      // if (userId === req.user._id) {
      const updatedEvent = await Event.findByIdAndUpdate(eventId, args.data, {
        new: true,
      })
      return updatedEvent
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default eventMutationResolvers
