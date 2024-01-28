export interface Project {
_id: string,
name: string,
userId: string,
stages: ProjectStage[]
}
export interface ProjectStage {
  _id: string,
  userId: string,
  projectId: string,
  name: string,
  index: number,
  steps: ProjectStep[]
}

export interface ProjectStep {
_id: string,
userId: string,
stageId: string,
projectId: string,
name: string,
index: number
}