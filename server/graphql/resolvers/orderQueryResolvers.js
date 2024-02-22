import Order from '../../models/Order.js'
import Client from '../../models/Client.js'
import OrderStatus from '../../models/OrderStatus.js'
import Project from '../../models/Project.js'

import { GraphQLError } from 'graphql'

const orderQueryResolvers = {
  orders: async () => {
    try {
      const orders = await Order.find().populate([
        'clientId',
        'status',
        'projectType',
      ])
      return orders
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  order: async (_, args) => {
    try {
      const order = await Order.findById(args.id).populate([
        'clientId',
        'status',
        'projectType',
      ])
      return order
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  filteredOrders: async (_, args) => {
    try {
      const list = await Order.find().populate(['clientId', 'status'])
      const filteredList = list.filter((item) => {
        return (
          item.title.toLowerCase().includes(args.data.toLowerCase()) ||
          item.orderNumber.toString().includes(args.data)
        )
      })
      return filteredList
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
}

export default orderQueryResolvers
