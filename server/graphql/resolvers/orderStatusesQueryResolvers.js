import OrderStatus from '../../models/OrderStatus.js'
import { checkAuth, throwServerError } from './helpers.js';


const orderStatusesQueryResolvers = {

  orderStatuses: async (_, __, context) => {
    checkAuth(context)
    try {
      const statuses = await OrderStatus.find({userId: context.user._id})
      const defaultStatuses = await OrderStatus.find({isDefault: true})
      return [...statuses, ...defaultStatuses]
    } catch (error) {
      throwServerError()
    }
  }
}

export default orderStatusesQueryResolvers