import Order from '../../models/Order.js'
import Client from '../../models/Client.js'
import OrderStatus from '../../models/OrderStatus.js'
import Project from '../../models/Project.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const orderQueryResolvers = {
  orders: async (_, __, context) => {
    checkAuth(context)
    try {
      const orders = await Order.find({ userId: context.user._id }).populate([
        'clientId',
        'status',
        'projectType',
      ])
      return orders
    } catch (error) {
      throwServerError()
    }
  },

  order: async (_, args, context) => {
    checkAuth(context)
    try {
      const order = await Order.findById(args.id).populate([
        'clientId',
        'status',
        'projectType',
      ])
      checkUserId(order, context)
      return order
    } catch (error) {
      throwServerError()
    }
  },

  filteredOrders: async (_, args, context) => {
    checkAuth(context)
    try {
      const list = await Order.find({ userId: context.user._id}).populate(['clientId', 'status'])
      const filteredList = list.filter((item) => {
        return (
          item.title.toLowerCase().includes(args.data.toLowerCase()) ||
          item.orderNumber.toString().includes(args.data)
        )
      })
      return filteredList
    } catch (error) {
      throwServerError()
    }
  },
}

export default orderQueryResolvers
