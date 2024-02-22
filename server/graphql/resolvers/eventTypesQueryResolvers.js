import EventType from '../../models/EventType.js'

import { GraphQLError } from 'graphql';


const eventTypesQueryResolvers = {
  eventTypes: async () => {
    try {
      const types = await EventType.find()
      return types
    } catch (error) {
      throw new GraphQLError(error)
    }
  }
}

export default eventTypesQueryResolvers