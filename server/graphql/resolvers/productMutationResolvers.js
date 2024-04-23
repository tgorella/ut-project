import Product from "../../models/Product.js"
import { checkAuth, throwServerError } from "./helpers.js"

const productMutationResolvers = {
  addProduct: async(_, args, context) => {
    checkAuth(context)
    try {
      const newData = {
        ...args.data,
        userId: context.user._id
      }

      const newProduct = await Product.create(newData)
      return newProduct
    } catch (error) {
      throwServerError()
    }
  },

  deleteProduct: async (_, args, context) => {
    checkAuth(context)
    try {
      const product = await Product.findById(args.id)
      checkUserId(product, context)
      await Product.deleteOne({ _id: args.id })
      return args.id
    } catch (error) {
      throwServerError()
    }
  },

  updateProduct: async(_, args, context) => {
    checkAuth(context)
    try {
      const product = await Product.findById(args.data._id)
      checkUserId(product, context)
      const updatedProduct = await Product.findByIdAndUpdate(args.data._id, args.data, {
        new: true,
      })
      return updatedProduct
    } catch (error) {
      throwServerError()
    }
  }
}

export default productMutationResolvers