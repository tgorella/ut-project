import { getUserAuthData } from './model/selectors/getUserAuthData'
import { userAction, userReducer } from './model/slice/userSlice'
import type { UserSchema, User } from './model/types/UserSchema'

export {userAction, userReducer, getUserAuthData} 
export type {UserSchema, User} 
