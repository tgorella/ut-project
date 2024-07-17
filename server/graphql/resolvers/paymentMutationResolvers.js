import Payment from '../../models/Payment.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const paymentMutationResolvers = {
  addPayment: async (_, args, context) => {
    checkAuth(context)
    try {
      const newData = {
        ...args.data,
        userId: context.user._id
      }
      const newPayment = await Payment.create(newData)
      return newPayment
    } catch (error) {
      throwServerError()
    }
  },

  deletePayment: async (_, args, context) => {
    checkAuth(context)
    try {
      const payment = await Payment.findById(args.id)
      checkUserId(payment, context)
      await Payment.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updatePayment: async (_, args, context) => {
    checkAuth(context)
    try {
      const paymentId = args.data._id
      const payment = await Payment.findById(paymentId)
      checkUserId(payment, context)
      const updatedPayment = await Payment.findByIdAndUpdate(paymentId, args.data, {
        new: true,
      })
      return updatedOrderStatus
    } catch (error) {
      throwServerError()
    }
  },
}

export default paymentMutationResolvers
