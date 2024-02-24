import { GraphQLError } from 'graphql';
import tokenService from '../services/token.service.js'

const context = async ({req}) => {
      
  const token = req.headers.authorization?.split(' ')[1] || undefined

  if (!token) {
    throw new GraphQLError('User is not authenticated', {
    extensions: {
      code: 'UNAUTHENTICATED',
      http: { status: 401 },
    },
  });
  }

  const data = tokenService.validateAccess(token)
  if (!data) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
   return {user: data}
}

export default context