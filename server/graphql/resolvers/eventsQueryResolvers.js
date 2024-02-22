import Event from '../../models/Event.js'
import EventType from '../../models/EventType.js'

import { GraphQLError } from 'graphql';


const eventQueryResolvers = {
  events: async () => {
    try {
      const events = await Event.find().populate({
        path: 'eventType'
      })
      return events
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  event: async (_, args) => {
    try {
      const event = await Event.findById(args.id)
      return event
    } catch (error) {
      throw new GraphQLError(error)
    }
  }
}

export default eventQueryResolvers