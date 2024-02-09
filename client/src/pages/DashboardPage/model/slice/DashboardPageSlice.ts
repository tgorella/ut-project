// import {PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { DashboardPageSchema } from '../types/DashboardPageSchema'

// const initialState: DashboardPageSchema = {
    
// }

// export const dashboardPageSlice = createSlice({
//     name: 'dashboardPage',
//     initialState,
//     reducers: {},
//     extraReducers(builder) {
// builder
//     .addCase(fetchProfileData.pending, (state) => {
//         state.error = undefined
//         state.isLoading = true
//     })
//     .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<Profile>) => {
//         state.isLoading = false
//         state.error = undefined
//         state.data = action.payload
//         state.form = action.payload

//     })
//     .addCase(fetchProfileData.rejected, (state, action) => {
//         state.isLoading= false
//         state.error = action.payload
//     })
// }
// })

// export const {actions: dashboardPageAction} = dashboardPageSlice
// export const {reducer: dashboardPageReducer} =dashboardPageSlice