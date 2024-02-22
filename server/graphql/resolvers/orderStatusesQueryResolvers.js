import OrderStatus from '../../models/OrderStatus.js'

import { GraphQLError } from 'graphql';


const orderStatusesQueryResolvers = {
  orderStatuses: async () => {
    try {
      const statuses = await OrderStatus.find()
      return statuses
    } catch (error) {
      throw new GraphQLError(error)
    }
  }
}

export default orderStatusesQueryResolvers