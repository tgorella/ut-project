import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Project, fetchProjects } from 'entities/Project'
import { ProjectsPageSchema } from '../types/ProjectsPage'

const initialState: ProjectsPageSchema = {
    isLoading: false,
    error: undefined,
    data: undefined
}

export const projectsPageSlice = createSlice({
    name: 'projectsPage',
    initialState,
    reducers: {

    },
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

export const {actions: projectsPageAction} = projectsPageSlice
export const {reducer: projectsPageReducer} =projectsPageSlice