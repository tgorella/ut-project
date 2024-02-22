import { GraphQLError } from 'graphql'
import Order from '../../models/Order.js'

const orderMutationResolvers = {
  addOrder: async (_, args) => {
    try {
      const newOrder = await Order.create({
        ...args.data,
      })
      
      await newOrder.populate({
        path: "userId"
      })
      return newOrder
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  deleteOrder: async (_, args) => {
    try {
      await Order.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateOrder: async (_, args) => {
    try {
      const orderId = args.data._id
      // if (userId === req.user._id) {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, args.data, {
        new: true,
      })
      return updatedOrder
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default orderMutationResolvers
