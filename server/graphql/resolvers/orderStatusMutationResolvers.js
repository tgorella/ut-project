import OrderStatus from '../../models/OrderStatus.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const orderStatusMutationResolvers = {
  addOrderStatus: async (_, args, context) => {
    checkAuth(context)
    try {
      const newData = {
        ...args.data,
        userId: context.user._id,
        isDefault: false
      }
      console.log(newData)
      const newOrderStatus = await OrderStatus.create(newData)
      return newOrderStatus
    } catch (error) {
      throwServerError()
    }
  },

  deleteOrderStatus: async (_, args, context) => {
    checkAuth(context)
    try {
      const status = await OrderStatus.findById(args.id)
      checkUserId(status, context)
      await OrderStatus.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updateOrderStatus: async (_, args, context) => {
    checkAuth(context)
    try {
      const orderStatusId = args.data._id
      const status = await OrderStatus.findById(orderStatusId)
      checkUserId(status, context)
      const updatedOrderStatus = await OrderStatus.findByIdAndUpdate(orderStatusId, args.data, {
        new: true,
      })
      return updatedOrderStatus
    } catch (error) {
      throwServerError()
    }
  },
}

export default orderStatusMutationResolvers
