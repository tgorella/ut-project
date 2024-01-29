import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProjectSelectSchema } from '../types/projectSelect'
import { fetchProjects } from 'entities/Project/model/services/fetchAllProjects/fetchAllProjects'
import { Project } from 'entities/Project/model/types/Project'

const initialState: ProjectSelectSchema = {
    isLoading: false,
    error: undefined,
    data: []
}

export const projectSelectSlice = createSlice({
    name: 'projectSelect',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: projectSelectAction} = projectSelectSlice
export const {reducer: projectSelectReducer} = projectSelectSlice