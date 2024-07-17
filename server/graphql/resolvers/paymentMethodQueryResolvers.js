import { checkAuth, checkUserId, throwServerError } from './helpers.js';
import PaymentMethod from '../../models/PaymentMethod.js'

const paymentMethodQueryResolvers = {

  paymentMethods: async (_, __, context) => {
    checkAuth(context)
    try {
      const methods = await PaymentMethod.find()
      return methods
    } catch (error) {
      throwServerError()
    }
  },
  paymentMethod: async(_, args, context) => {
    checkAuth(context)
    try {
      const method = await PaymentMethod.findById(args.id) 
      checkUserId(method, context)
      return method
    } catch (error) {
      throwServerError()
    }
  }
}

export default paymentMethodQueryResolvers