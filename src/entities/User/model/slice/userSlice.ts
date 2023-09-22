import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { User, UserSchema } from '../types/UserSchema'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: UserSchema = {
    authData: {
        id: '',
        username: ''
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData= action.payload
        },
    
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY) 
            if (user) {
                state.authData = JSON.parse(user)
            }
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)

        }
    },
})

export const {actions: userAction} = userSlice
export const {reducer: userReducer} = userSlice