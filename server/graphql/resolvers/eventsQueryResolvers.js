import Event from '../../models/Event.js'
import EventType from '../../models/EventType.js'

import { checkAuth, checkUserId, throwServerError } from './helpers.js';


const eventQueryResolvers = {

  events: async (_, __, context) => {
    checkAuth(context)
    try {
      const events = await Event.find({userId: context.user._id}).populate({
        path: 'eventType'
      })
      return events
    } catch (error) {
     throwServerError()
    }
  },

  event: async (_, args, context) => {
    checkAuth(context)
    try {
      const event = await Event.findById(args.id)
      checkUserId(event.context)
      return event
    } catch (error) {
     throwServerError()
    }
  }
}

export default eventQueryResolvers