import userQueryResolvers from './userQueryResolvers.js';
import userMutationResolvers from './userMutationResolvers.js';
import tokenMutationResolvers from './tokenMutationResolvers.js'
import orderQueryResolvers from './orderQueryResolvers.js';
import projectQueryResolvers from './projectQueryResolvers.js';
import clientQueryResolvers from './clientQueryResolvers.js';
import eventQueryResolvers from './eventsQueryResolvers.js';
import eventTypesQueryResolvers from './eventTypesQueryResolvers.js';
import orderStatusesQueryResolvers from './orderStatusesQueryResolvers.js';
import modulesStatusQueryResolvers from './modulesQueryResolvers.js';

const resolvers =  {
  Query: {
    ...userQueryResolvers,
    ...orderQueryResolvers,
    ...projectQueryResolvers,
    ...clientQueryResolvers,
    ...eventQueryResolvers,
    ...eventTypesQueryResolvers,
    ...orderStatusesQueryResolvers,
    ...modulesStatusQueryResolvers
  },
  Mutation: {
    ...userMutationResolvers,
    ...tokenMutationResolvers
  }
}

export default resolvers