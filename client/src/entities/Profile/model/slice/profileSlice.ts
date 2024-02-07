import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema, ProfileWithPass } from '../types/profileSchema'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

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
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        chancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
        },
        updateProfile: (state, action: PayloadAction<ProfileWithPass>) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },
        increaseOrderNumber: (state) => {
            state.data!.lastOrderNumber = (Number(state.data?.lastOrderNumber) + 1).toString()
            state.form!.lastOrderNumber = (Number(state.form?.lastOrderNumber) + 1).toString()
        },
        
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload

            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload

            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: profileAction} = profileSlice
export const {reducer: profileReducer} = profileSlice