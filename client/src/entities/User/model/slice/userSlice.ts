import { USERID_KEY } from '@/shared/const/localstorage'
import type { User, UserSchema } from '../types/userSchema'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { tokenService } from '@/entities/Token'

const initialState: UserSchema = {
    authData: {
        _id: '',
        email: ''
    },
    isLogged: false,
    mounted: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = {
                _id: action.payload._id,
                email: action.payload.email}
            if (action.payload._id) {
                state.isLogged = true
            }
        },
    
        initAuthData: (state) => {
            const user = tokenService.getUserId() 
            if (user) {
                state!.authData!._id = user
                state.isLogged = true
            }
            state.mounted = true
        },
        logout: (state) => {
            state.authData = {
                _id: '',
                email: ''
            },
            localStorage.removeItem(USERID_KEY)
            state.isLogged = false

        }
    },
})

export const {actions: userAction} = userSlice
export const {reducer: userReducer} = userSlice