import { GraphQLError } from 'graphql';
import User from '../../models/User.js'
import bcryptjs from 'bcryptjs'
import tokenService from '../../services/token.service.js';
import { checkAuth, checkUserId, throwServerError } from './helpers.js';

const userMutationResolvers = {

  signUp: async (_, args) => {
    try {
    const { password} = args.data;
    const existingUser = await User.findOne({ email: args.data.email });
   
    if (existingUser) {
      throw new GraphQLError("EMAIL_EXISTS")
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = await User.create({
      ...args.data, 
      password: hashedPassword, 
      lastOrderNumber: '1'
    })

    const tokens = tokenService.generate({ _id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);
    newUser.password = null
    return newUser
    } catch (error) {
      throwServerError()
    }
  },

  deleteUser: async (_, __, context) => {
    checkAuth(context)
    try {
    await User.deleteOne({_id:context.user._id});
    return context.user._id
    } catch (error) {
      throwServerError()
    }
  },

  updateUser: async (_, args, context) => {
    checkAuth(context)
    try {
      const {userId} = args
      const user = await User.findById(userId)
      checkUserId(user, context)
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
          new: true,
        });
        return updatedUser;
    } catch (error) {
      throwServerError()
    }
  }
}

export default userMutationResolvers