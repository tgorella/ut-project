import { GraphQLError } from 'graphql';
import User from '../../models/User.js'
import bcryptjs from "bcryptjs"
import tokenService from '../../services/token.service.js';
import { checkAuth, throwServerError } from './helpers.js';


const userQueryResolvers = {
  user: async (_, __, context) => {
    checkAuth(context)
    try {
      const user = await User.findById(context.user._id);
      user.password = null
    return user
    } catch (error) {
      throwServerError()
    }
  },
  signInWithPassword: async (_, args) => {
    try {
      const { email, password } = args.data;
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new GraphQLError("EMAIL_NOT_FOUND")
        };
      
      const isPasswordEqual = await bcryptjs.compare(
        password,
        existingUser.password
      );
      
      if (!isPasswordEqual) {
        throw new GraphQLError("INVALID_PASSWORD")
      }
      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);
      return ({ ...tokens, userId: existingUser._id })
    } catch (error) {
      throwServerError()
    }
  }
}

export default userQueryResolvers