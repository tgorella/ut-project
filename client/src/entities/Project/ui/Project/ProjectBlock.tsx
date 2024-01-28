import cls from './ProjectBlock.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Box } from 'shared/ui/Box'
import { Project } from '../../model/types/Project'
import { Stage } from '../Stage/Stage'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteProject } from 'entities/Project/model/services/deleteProject/deleteProject'
import { useTranslation } from 'react-i18next'
import { updateProject } from 'entities/Project/model/services/updateProject/updateProject'

interface ProjectProps {
  className?: string;
  project: Project,
  onAddStage: (projectId: string, index: number) => void,
  onAddStep: (projectId: string, stageId: string, index: number) => void,


}
export const ProjectBlock = memo(({className, project, onAddStage, onAddStep} : ProjectProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('project')
    
    const handleDelete = () => {
        dispatch(deleteProject(project._id))
    }

    const handleAddStage = () => {
        onAddStage(project._id, project.stages.length)
    }
    const handleDeleteStage = (stageId: string) => {
        const stages = project.stages.filter((stage) => stage._id !== stageId)
        dispatch(updateProject({_id: project._id, stages: stages}))
    }
    return ( 
        <Box header={project.name} className={classNames(cls.Project, {}, [className])}>
            <AppButton
                theme={ButtonTheme.CLEAR}
                onClick={handleDelete}
                className={cls.delBtn}
                title={t('Удалить проект')}>
                < Trash2 />
            </AppButton>
            <div className={cls.stage_wrapper}>
                {
                    project.stages.map((stage) => {
                        return <Stage 
                            key={stage._id} 
                            stage={stage} 
                            onAddStep={onAddStep}
                            onDeleteStage={handleDeleteStage} 
                        />
                    })
                }
                <AppButton
                    title={t('Добавить стадию')}
                    theme={ButtonTheme.GRAY}
                    className={cls.btn}
                    stretch={true}
                    onClick={handleAddStage}>
                    <PlusCircle />
                </AppButton>
            </div>
        </Box>
    )
})