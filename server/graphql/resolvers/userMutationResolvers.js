import { GraphQLError } from 'graphql';
import User from '../../models/User.js'
import bcryptjs from 'bcryptjs'
import tokenService from '../../services/token.service.js';

const userMutationResolvers = {
  addUser: async (_, args) => {
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
      throw new GraphQLError(error)
    }
  },
  deleteUser: async (_, args) => {
    try {
    await User.deleteOne({_id: args.id});
    return args.id
    } catch (error) {
      throw new GraphQLError(error)
    }
  },
  updateUser: async (_, args) => {
    try {
      const {userId} = args
      // if (userId === req.user._id) {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
          new: true,
        });
        res.send(updatedUser);
      // } else {
      //   res.status(401).json({ message: "Unauthorized" });
      // }
    } catch (error) {
      throw new GraphQLError(error)
    }
  }
}

export default userMutationResolvers