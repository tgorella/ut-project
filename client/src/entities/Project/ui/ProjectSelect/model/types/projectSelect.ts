import { Project } from '../../../../model/types/Project'

export interface ProjectSelectSchema {
isLoading: boolean,
error?: string,
data: Project[]
}