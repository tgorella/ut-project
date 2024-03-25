import { GraphQLError } from 'graphql'
import User from '../../models/User.js'
import bcryptjs from 'bcryptjs'
import tokenService from '../../services/token.service.js'
import { checkAuth, throwServerError } from './helpers.js'

const userMutationResolvers = {
  signUp: async (_, args) => {
    try {
      const existingUser = await User.findOne({ email: args.data.email })

      if (existingUser) {
        throw new GraphQLError('EMAIL_EXISTS')
      }
      const hashedPassword = await bcryptjs.hash(args.data.password, 12)
      const newUser = await User.create({
        ...args.data,
        password: hashedPassword,
        lastOrderNumber: '1',
        username: args.data.email.split('@')[0]
      })
      if (!newUser.ownerId) {
        newUser.ownerId = newUser._id
        newUser.save()
      }

      const tokens = tokenService.generate({ _id: newUser._id })
      await tokenService.save(newUser._id, tokens.refreshToken)
      newUser.password = null
      return {...newUser, ...tokens}
    } catch (error) {
      throwServerError()
    }
  },

  deleteUser: async (_, __, context) => {
    checkAuth(context)
    try {
      await User.deleteOne({ _id: context.user._id })
      return context.user._id
    } catch (error) {
      throwServerError()
    }
  },

  updateUser: async (_, args, context) => {
    checkAuth(context)
    try {
      const userId = args.data._id
      if (context.user._id !== userId) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        })
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        args.data,
        {
          new: true,
        }
      )
      if (updatedUser.password) {
        updatedUser.password = null
      }

      return updatedUser
    } catch (error) {
      throwServerError()
    }
  },

  updatePass: async (_, args, context) => {
    checkAuth(context)
    try {

      const hashedPassword = await bcryptjs.hash(args.pass, 12)
      await User.findByIdAndUpdate(
        context.user._id,
        {
          password: hashedPassword,
        },
        {
          new: true,
        }
      )
      return 'success'
    } catch (error) {
      throwServerError()
    }
  },
}

export default userMutationResolvers
