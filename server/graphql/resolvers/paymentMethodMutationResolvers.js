import Payment from '../../models/Payment.js'
import PaymentMethod from '../../models/PaymentMethod.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const paymentMethodMutationResolvers = {
  addPaymentMethod: async (_, args, context) => {
    checkAuth(context)
    try {
     
      const newPaymentMethod = await PaymentMethod.create(args.data)
      return newPaymentMethod
    } catch (error) {
      throwServerError()
    }
  },

  deletePaymentMethod: async (_, args, context) => {
    checkAuth(context)
    try {
      const paymentMethod = await PaymentMethod.findById(args.id)
      checkUserId(paymentMethod, context)
      await PaymentMethod.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updatePaymentMethod: async (_, args, context) => {
    checkAuth(context)
    try {
      const paymentMethodId = args.data._id
      const paymentMethod = await PaymentMethod.findById(paymentMethodId)
      checkUserId(paymentMethod, context)
      const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(paymentMethodId, args.data, {
        new: true,
      })
      return updatedPaymentMethod
    } catch (error) {
      throwServerError()
    }
  },
}

export default paymentMethodMutationResolvers
