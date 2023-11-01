import { getIsLogged } from './model/selectors/getIsLogged'
import { getIsMounted } from './model/selectors/getIsMounted'
import { getUserAuthData } from './model/selectors/getUserAuthData'
import { userAction, userReducer } from './model/slice/userSlice'
import type { UserSchema, User } from './model/types/userSchema'

export {userAction, userReducer, getUserAuthData, getIsLogged, getIsMounted} 
export type {UserSchema, User} 
