import { ProjectStage } from '@/entities/Project'

export function countTotalSteps (stages: ProjectStage[]) {
    return stages.reduce((acc, val) => {
        return acc + val.steps.length
    }, 0)
}