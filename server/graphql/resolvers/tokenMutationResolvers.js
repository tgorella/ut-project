import { isTokenInvalid, throwServerError } from './helpers.js'
import tokenService from '../../services/token.service.js'

const tokenMutationResolvers = {
  updateToken: async (_, args) => {
    try {
      const { refreshToken } = args
      const data = tokenService.validateRefresh(refreshToken)
      const dbToken = await tokenService.findToken(refreshToken)

      if (isTokenInvalid(data, dbToken)) {
        throw new GraphQLError('BAD_TOKEN')
      }

      const tokens = await tokenService.generate({
        _id: data._id,
      })
      await tokenService.save(data._id, tokens.refreshToken)

      return { ...tokens, userId: data._id }
    } catch (error) {
      throwServerError()
    }
  },
}

export default tokenMutationResolvers
