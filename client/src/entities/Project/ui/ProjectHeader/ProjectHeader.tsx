import cls from './ProjectHeader.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { ProjectStage } from '../../model/types/Project'
import { countTotalSteps } from '@/pages/ProjectsPage/model/lib/countTotalSteps'


interface ProjectHeaderProps {
  className?: string;
  projectName: string,
  stages: ProjectStage[]
}
export const ProjectHeader = memo(({className, projectName, stages} : ProjectHeaderProps) => {
    const totalSteps = countTotalSteps(stages)
    return ( 
        <div className={classNames(cls.ProjectHeader, {}, [className])}>
            <div className={cls.projectName}>{projectName}</div>
            {stages.map((stage) => {
                return <div key={stage._id} className={cls.stageWrapper}>
                    <div className={cls.title}>{stage.name}</div>
                    <div className={cls.stepTitle} style={{gridTemplateColumns: `repeat(${stage.steps.length}, minmax(110px, ${window.innerWidth/totalSteps}px)`}}>
                        {stage.steps.map((step) => {
                            return (
                                <div key={step._id} className={cls.stepWrapper} >
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