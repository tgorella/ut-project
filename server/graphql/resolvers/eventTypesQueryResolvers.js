import EventType from '../../models/EventType.js'

import { checkAuth, throwServerError } from './helpers.js';


const eventTypesQueryResolvers = {
  eventTypes: async (_, __, context) => {
    checkAuth(context)
    try {
      const types = await EventType.find({userId: context.user._id})
      return types
    } catch (error) {
      throwServerError()
    }
  }
}

export default eventTypesQueryResolvers