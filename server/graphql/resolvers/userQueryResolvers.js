import { GraphQLError } from 'graphql';
import User from '../../models/User.js'
import bcryptjs from "bcryptjs"
import tokenService from '../../services/token.service.js';


const userQueryResolvers = {
  users: async () =>{
    try {
      const users = await User.find();
    return users.map((user) => {
      user.password = null
      return user
    })
    } catch (error) {
      throw new GraphQLError(error)
    }
    
  },
  user: async (_,args) => {
    try {
      const user = await User.findById(args.id);
      user.password = null
    return user
    } catch (error) {
      throw new GraphQLError(error)
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
      throw new GraphQLError(error)
    }
  }
}

export default userQueryResolvers