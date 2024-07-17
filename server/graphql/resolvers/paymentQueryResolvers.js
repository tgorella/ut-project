import { checkAuth, checkUserId, throwServerError } from './helpers.js';
import Payment from '../../models/Payment.js';

const paymentQueryResolvers = {

  payments: async (_, __, context) => {
    checkAuth(context)
    try {
      const payments = await Payment.find({userId: context.user._id})
      return payments
    } catch (error) {
      throwServerError()
    }
  },
  payment: async(_, args, context) => {
    checkAuth(context)
    try {
      const payment = await Payment.findById(args.id).populate([
        'method',
        'order',
      ])
      checkUserId(method, context)
      return payment
    } catch (error) {
      throwServerError()
    }
  },
  paymentsByOrder: async (_, args, context) => {
    checkAuth(context)
    try {
      const payments = await Payment.find({userId: context.user._id, order: args.id})
      return payments
    } catch (error) {
      throwServerError()
    }
  },
}

export default paymentQueryResolvers