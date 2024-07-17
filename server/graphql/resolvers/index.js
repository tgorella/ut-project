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
import orderMutationResolvers from './orderMutationResolvers.js';
import clientMutationResolvers from './clientMutationResolvers.js';
import orderStatusMutationResolvers from './orderStatusMutationResolvers.js';
import eventMutationResolvers from './eventMutationResolvers.js';
import eventTypeMutationResolvers from './eventTypeMutationResolvers.js';
import projectStepMutationResolvers from './projectStepMutationResolvers.js';
import projectMutationResolvers from './projectMutationResolvers.js';
import projectStageMutationResolvers from './projectStageMutationResolvers.js';
import modulesMutationResolvers from './modulesMutationResolvers.js';
import productQueryResolvers from './productQueryResolvers.js';
import productMutationResolvers from './productMutationResolvers.js';
import fileMutationResolvers from './fileMutationResolvers.js';
import GraphQlUpload from 'graphql-upload/GraphQLUpload.mjs';
import paymentQueryResolvers from './paymentQueryResolvers.js';
import paymentMutationResolvers from './PaymentMutationResolvers.js';
import paymentMethodQueryResolvers from './paymentMethodQueryResolvers.js';
import paymentMethodMutationResolvers from './paymentMethodMutationResolvers.js';

const resolvers =  {
  Upload: GraphQlUpload,
  Query: {
    ...userQueryResolvers,
    ...orderQueryResolvers,
    ...projectQueryResolvers,
    ...clientQueryResolvers,
    ...eventQueryResolvers,
    ...eventTypesQueryResolvers,
    ...orderStatusesQueryResolvers,
    ...modulesStatusQueryResolvers,
    ...productQueryResolvers,
    ...paymentMethodQueryResolvers,
    ...paymentQueryResolvers
  },
  Mutation: {
    ...userMutationResolvers,
    ...tokenMutationResolvers,
    ...orderMutationResolvers,
    ...clientMutationResolvers,
    ...orderStatusMutationResolvers,
    ...eventMutationResolvers,
    ...eventTypeMutationResolvers,
    ...projectMutationResolvers,
    ...projectStageMutationResolvers,
    ...projectStepMutationResolvers,
    ...modulesMutationResolvers,
    ...productMutationResolvers,
    ...fileMutationResolvers,
    ...paymentMutationResolvers,
    ...paymentMethodMutationResolvers
  }
}

export default resolvers