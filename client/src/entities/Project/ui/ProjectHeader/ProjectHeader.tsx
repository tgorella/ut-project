import cls from './ProjectHeader.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { ProjectStage } from 'entities/Project/model/types/Project'


interface ProjectHeaderProps {
  className?: string;
  projectName: string,
  stages: ProjectStage[]
}
export const ProjectHeader = memo(({className, projectName, stages} : ProjectHeaderProps) => {
    function totalSteps (stArr: ProjectStage[]) {
        let total = 0
        stArr.forEach((stage) => {
            total += stage.steps.length
        })
        return total
    }

    const total = totalSteps(stages)
    const width = document.documentElement.clientWidth > total*100 ? (document.documentElement.clientWidth- 300) / total+'px' : '100px'
    return ( 
        <div className={classNames(cls.ProjectHeader, {}, [className])}>
            <div className={cls.projectName}>{projectName}</div>
            {stages.map((stage) => {
                return <div key={stage._id} className={cls.stageWrapper}>
                    <div className={cls.title}>{stage.name}</div>
                    <div className={cls.stepTitle}>
                        {stage.steps.map((step) => {
                            return (
                                <div key={step._id} className={cls.stepWrapper} style={{width: width}}>
                                    {step.name}
                                </div>
                            )
                        })}
                    </div>


                </div>
            })}
        </div>
    )
})