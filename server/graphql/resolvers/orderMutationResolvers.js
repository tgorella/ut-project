import Order from '../../models/Order.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const orderMutationResolvers = {
  addOrder: async (_, args, context) => {
    checkAuth(context)
    try {
      const newOrder = await Order.create({
        ...args.data,
        userId: context.user._id
      })
      
      await newOrder.populate(['clientId', 'status'])
      return newOrder
    } catch (error) {
      throwServerError()
    }
  },

  deleteOrder: async (_, args, context) => {
    checkAuth(context)
    try {
      const order = await Order.findById(args.id)
      checkUserId(order, context)
      await Order.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updateOrder: async (_, args, context) => {
    checkAuth(context)
    try {
      const orderId = args.data._id
      const order = await Order.findById(orderId)
      checkUserId(order, context)
      const updatedOrder = await Order.findByIdAndUpdate(orderId, args.data, {
        new: true,
      })
      await updatedOrder.populate(['clientId', 'status'])
      return updatedOrder
    } catch (error) {
      throwServerError()
    }
  },
}

export default orderMutationResolvers
