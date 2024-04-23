import Product from '../../models/Product.js'
import { checkAuth, checkUserId, throwServerError } from './helpers.js'

const productQueryResolvers = {
  products: async (_, __, context) => {
    checkAuth(context)
    try {
      const products = await Product.find({ userId: context.user._id }).sort({
        createdAt: -1,
      })
      return products
    } catch (error) {
      throwServerError()
    }
  },

  product: async (_, args, context) => {
    checkAuth(context)
    try {
      const product = await Product.findById(args.id)
      checkUserId(product, context)
      return product
    } catch (error) {
      throwServerError()
    }
  },

  productsByCategory: async (_, { category }, context) => {
    checkAuth(context)
    try {
      const products = await Product.find({
        category,
        userId: context.user._id,
      }).sort({ createdAt: -1 })
      return products
    } catch (error) {
      throwServerError()
    }
  },

  filteredProducts: async (_, args, context) => {
    checkAuth(context)
    const search = new RegExp(args.data, 'i')
    try {
      const list = await Product.find({ userId: context.user._id })
        .or([{ name: search }])
        .sort({ createdAt: -1 })
      return list
    } catch (error) {
      throwServerError()
    }
  },
}

export default productQueryResolvers