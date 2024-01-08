import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginByEmail } from '../services/loginByEmail/loginByEmail'

const initialState: LoginSchema = {
    email: '',
    password: '',
    isLoading: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUserEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginByEmail.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(loginByEmail.fulfilled, (state) => {
                state.isLoading = false
                state.error = undefined
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    },
})

export const {actions: loginAction} = loginSlice
export const {reducer: loginReducer} = loginSlice