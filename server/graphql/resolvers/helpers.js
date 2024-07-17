import User from "../../models/User.js";
import { GraphQLError } from 'graphql'

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

async function getUser (userId) {
const user = await User.findById(userId)
user.password = null
return user
}

function checkAuth (context) {
  if (!context.isAuth) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }
}

function checkUserId(el, context) {
  if (el.userId.toString() !== context.user._id) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    })
  }
}

function throwServerError () {
  throw new GraphQLError('На сервере произошла ошибка. Попробуйте позже', {
    extensions: {
      code: 'InternalServerError',
      http: { status: 500 },
    },
  })
}
export {
  isTokenInvalid,
  getUser,
  checkAuth,
  checkUserId,
  throwServerError
}