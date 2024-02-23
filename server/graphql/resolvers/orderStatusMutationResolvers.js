import { GraphQLError } from 'graphql'
import OrderStatus from '../../models/OrderStatus.js'

const orderStatusMutationResolvers = {
  addOrderStatus: async (_, args) => {
    try {
      const newOrderStatus = await OrderStatus.create({
        ...args.data,
      })
      return newOrderStatus
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteOrderStatus: async (_, args) => {
    try {
      await OrderStatus.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateOrderStatus: async (_, args) => {
    try {
      const orderStatusId = args.data._id
      // if (userId === req.user._id) {
      const updatedOrderStatus = await OrderStatus.findByIdAndUpdate(orderStatusId, args.data, {
        new: true,
      })
      return updatedOrderStatus
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default orderStatusMutationResolvers
