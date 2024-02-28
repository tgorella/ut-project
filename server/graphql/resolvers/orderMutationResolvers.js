import Order from '../../models/Order.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const orderMutationResolvers = {
  addOrder: async (_, args, context) => {
    checkAuth(context)
    try {
      const newData = {
        ...args.data,
        userId: context.user._id
      }
      console.log(newData)
      const newOrder = await Order.create(newData)
      await newOrder.populate(['clientId',
      'status',
      'projectType'])

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
      const order = await Order.findById(args.data._id)
      checkUserId(order, context)
      const updatedOrder = await Order.findByIdAndUpdate(args.data._id, args.data, {
        new: true,
      })
      await updatedOrder.populate(['clientId',
      'status',
      'projectType'])
      return updatedOrder
    } catch (error) {
      throwServerError()
    }
  },
}

export default orderMutationResolvers
