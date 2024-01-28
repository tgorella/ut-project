import { Project } from 'entities/Project'

export interface ProjectEditSchema {
isLoading: boolean,
data: Project[],
error?: string
}