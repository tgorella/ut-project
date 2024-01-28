import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProjectEditSchema } from '../types/projectEditSchema'
import { Project, addProject, addStage, addStep, deleteProject, deleteProjectStage, deleteProjectStep, fetchProjects, updateProject, updateStage, updateStep } from 'entities/Project'

const initialState: ProjectEditSchema = {
    isLoading: false,
    data: [],
    error: undefined
}

 
export const projectEditSlice = createSlice({
    name: 'projectEdit',
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
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.data = state.data.filter((el) => el._id !== action.payload)
            })
            .addCase(deleteProjectStage.fulfilled, (state, action) => {
                const {stage, project} = action.payload
                const editedProject = state.data.findIndex((el) => el._id === project)
                state.data[editedProject].stages = state.data[editedProject].stages.filter((el) => el._id !== stage)
            })
            .addCase(deleteProjectStep.fulfilled, (state, action) => {
                const {step, stage, project} = action.payload
                const projectIndex = state.data.findIndex((el) => el._id === project)
                const stageIndex = state.data[projectIndex].stages.findIndex((el) => el._id === stage)
                state.data[projectIndex].stages[stageIndex].steps = state.data[projectIndex].stages[stageIndex].steps.filter((el) => el._id !== step)
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                const index = state.data.findIndex((el) => el._id === action.payload._id)
                state.data[index] = action.payload
            })
            .addCase(updateStage.fulfilled, (state, action) => {
                const projectIndex = state.data.findIndex((el) => el._id === action.payload.projectId)
                const stageIndex = state.data[projectIndex].stages.findIndex((el) => el._id === action.payload._id)
                state.data[projectIndex].stages[stageIndex] = action.payload
            })
            .addCase(updateStep.fulfilled, (state, action) => {
                const projectIndex = state.data.findIndex((el) => el._id === action.payload.projectId)
                const stageIndex = state.data[projectIndex].stages.findIndex((el) => el._id === action.payload.stageId)
                const stepIndex = state.data[projectIndex].stages[stageIndex].steps.findIndex((el) => el._id === action.payload._id)
                state.data[projectIndex].stages[stageIndex].steps[stepIndex] = action.payload
            })
            .addCase(addProject.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(addStage.fulfilled, (state, action) => {
                const projectIndex = state.data.findIndex((el) => el._id === action.payload.projectId)
                state.data[projectIndex].stages.push(action.payload)
            })
            .addCase(addStep.fulfilled, (state, action) => {
                const projectIndex = state.data.findIndex((el) => el._id === action.payload.projectId)
                const stageIndex = state.data[projectIndex].stages.findIndex((el) => el._id === action.payload.stageId)
                state.data[projectIndex].stages[stageIndex].steps.push(action.payload)
            })
    }
})

export const {actions: projectEditAction} = projectEditSlice
export const {reducer: projectEditReducer} = projectEditSlice