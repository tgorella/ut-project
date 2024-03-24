import Order from '../../models/Order.js'
import Client from '../../models/Client.js'
import OrderStatus from '../../models/OrderStatus.js'
import Project from '../../models/Project.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'
import clientMutationResolvers from './clientMutationResolvers.js'

const orderQueryResolvers = {
  orders: async (_, __, context) => {
    checkAuth(context)
    try {
      const orders = await Order.find({ userId: context.user._id }).populate([
        'eventType',
        'clientId',
        'status',
        'projectType',
      ]).sort({createdAt: -1})
      return orders
    } catch (error) {
      throwServerError()
    }
  },

  ordersByClient: async (_, args, context) => {
    checkAuth(context)
    try {
      const orders = await Order.find({ userId: context.user._id, clientId: args.id }).populate([
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
    const search = new RegExp(args.data, "i")
    const num = new RegExp(args.data, "i")
    try {
      if (args.data !== '' && Number(args.data) == args.data) {
        const list = await Order.find({ userId: context.user._id}).populate([
          'status',
          'projectType',
        ]).or([{orderNumber: args.data}]).sort({createdAt: -1})
        
        return list
      }
      const list = await Order.find({ userId: context.user._id}).populate([
        'status',
        'projectType',
      ]).or([{title: search}]).sort({createdAt: -1})
      
      return list
    } catch (error) {
      throwServerError()
    }
  },
}

export default orderQueryResolvers
