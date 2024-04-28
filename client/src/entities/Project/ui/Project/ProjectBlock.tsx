import cls from './ProjectBlock.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {RefObject, memo, useState} from 'react'
import { Box } from '@/shared/ui/Box'
import { Project } from '../../model/types/Project'
import { Stage } from '../Stage/Stage'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { deleteProject } from '../../model/services/deleteProject/deleteProject'
import { useTranslation } from 'react-i18next'
import React from 'react'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { updateProject } from '../../model/services/updateProject/updateProject'

interface ProjectProps {
  className?: string;
  project: Project,
  onAddStage: (projectId: string, index: number) => void,
  onAddStep: (projectId: string, stageId: string, index: number) => void,


}
export const ProjectBlock = memo(({className, project, onAddStage, onAddStep} : ProjectProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('project')
    const contentEditable: RefObject<HTMLElement>  = React.createRef()
    const [value, setValue] = useState(project.name || '')

    const handleChange = (e: ContentEditableEvent) => {
        setValue(e.target.value)
    }
    const handleSave = () => {
        if (project.name !== value) {
            dispatch(updateProject({_id: project._id, name: value}))
        }
    }
    
    const handleDelete = () => {
        dispatch(deleteProject(project._id))
    }

    const handleAddStage = () => {
        onAddStage(project._id, project.stages.length)
    }
   
    return ( 
        <Box header={
            <ContentEditable
                onChange={handleChange}
                html={value}
                innerRef={contentEditable}
                onBlur={handleSave}
            />
        } className={classNames(cls.Project, {}, [className])}>
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