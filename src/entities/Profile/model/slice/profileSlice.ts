import {createSlice } from '@reduxjs/toolkit'
import { ProfileSchema } from '../types/profileSchema'

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
})

export const {actions: profileAction} = profileSlice
export const {reducer: profileReducer} = profileSlice