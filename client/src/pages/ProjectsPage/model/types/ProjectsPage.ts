import { Project } from 'entities/Project'

export interface ProjectsPageSchema {
  isLoading: boolean,
  data?: Project[],
  error?: string,
}