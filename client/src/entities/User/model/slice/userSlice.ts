import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { User, UserSchema } from '../types/userSchema'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: UserSchema = {
    authData: {
        id: '',
        username: ''
    },
    isLogged: false,
    mounted: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData= action.payload
            if (action.payload.id) {
                state.isLogged = true
            }
        },
    
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY) 
            if (user) {
                state.authData = JSON.parse(user)
                state.isLogged = true
            }
            state.mounted = true
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
            state.isLogged = false

        }
    },
})

export const {actions: userAction} = userSlice
export const {reducer: userReducer} = userSlice