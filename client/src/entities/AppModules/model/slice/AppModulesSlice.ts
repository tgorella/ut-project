import {createSlice } from '@reduxjs/toolkit'
import {AppModulesSchema } from '../types/AppModules'
import { fetchUserModules } from '../services/fetchUserModules/fetchUserModules'

const initialState: AppModulesSchema = {
    isLoading: false,
    error: undefined,
    data: undefined
}

export const appModulesSlice = createSlice({
    name: 'appModules',
    initialState,
    reducers: {
        updateModulesVisibility: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
        },
        initModules: (state) => {
            state.data = {
                _id: Date.now().toString(),
                clients: true,
                orders: true,
                calendar: true,
                workFlow: true
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserModules.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchUserModules.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = undefined
                if (Array.isArray(action.payload)) {
                    state.data = action.payload[0]
                } else {
                    state.data = action.payload
                }
            })
            .addCase(fetchUserModules.rejected, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.error = action.payload
            })
    }
})

export const {actions: appModulesAction} = appModulesSlice
export const {reducer: appModulesReducer} =appModulesSlice