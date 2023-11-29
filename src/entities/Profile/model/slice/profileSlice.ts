import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Modules, Profile, ProfileSchema } from '../types/profileSchema'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
    readonly: true,
    isLoading: false,
    error: undefined,
    data: undefined,
    modules: undefined
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
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload
            }
        },
        increaseOrderNumber: (state) => {
            state.data!.lastOrderNumber = (Number(state.data?.lastOrderNumber) + 1).toString()
            state.form!.lastOrderNumber = (Number(state.form?.lastOrderNumber) + 1).toString()
        },
        updateModulesVisibility: (state, action: PayloadAction<Partial<Modules>>) => {
            state.modules = {
                ...state.modules,
                ...action.payload
            }
        },
        initModules: (state) => {
            state.data!.modules = {
                clients: true,
                orders: true
            }
        }
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
                state.modules = action.payload.modules
                const profileData = action.payload
                delete profileData.modules
                state.data = profileData
                state.form = profileData

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