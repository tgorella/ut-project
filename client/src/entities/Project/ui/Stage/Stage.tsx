import cls from './Stage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {RefObject, memo, useState} from 'react'
import { ProjectStage } from 'entities/Project/model/types/Project'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import { Step } from '../Step/Step'
import { PlusCircle, Trash2 } from 'lucide-react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { updateStage } from 'entities/Project/model/services/updateStage/updateStage'
import { deleteProjectStage } from 'entities/Project/model/services/deleteStage/deleteStage'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'


interface StageProps {
  className?: string;
  stage: ProjectStage,
  onDeleteStage: (stageId: string) => void,
  onAddStep: (projectId: string, stageId: string, index: number) => void
}
export const Stage = memo(({className, stage, onAddStep, onDeleteStage} : StageProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const contentEditable: RefObject<HTMLElement>  = React.createRef()
    const [value, setValue] = useState(stage.name || '')

    const handleChange = (e: ContentEditableEvent) => {
        setValue(e.target.value)
    }
    const handleSave = () => {
        if (stage.name !== value) {
            dispatch(updateStage({_id: stage._id, name: value}))
        }
    }
    const handleDelete = (stageId: string) => {
        dispatch(deleteProjectStage(stageId)).then(() => {
            onDeleteStage(stage._id)
        })
    }
    const handleAddStep = () => {
        onAddStep(stage.projectId, stage._id, stage.steps.length)
    }
    const handleDeleteStep = (stepId: string) => {
        const steps = stage.steps.filter((step) => step._id !== stepId)
        dispatch(updateStage({_id: stage._id, steps: steps}))
    }
    return ( 
        <div className={classNames(cls.Stage, {}, [className])}>
            <div className={cls.stage_header__wrapper}>
                <ContentEditable
                    className={cls.stage_header}
                    onChange={handleChange}
                    html={value}
                    innerRef={contentEditable}
                    onBlur={handleSave}
                />
                <div className={cls.stage_header_delBtn} onClick={() => handleDelete(stage._id)} title={t('удалить стадию')}><Trash2 /></div>
            </div>
            <div className={cls.steps_wrapper}>
                {stage.steps.map((step) => (
                    <Step step={step} key={step._id} onDeleteStep={handleDeleteStep} />))}
            </div>
            <AppButton 
                stretch={true} 
                title={t('Добавить шаг')}
                theme={ButtonTheme.GRAY} 
                onClick={handleAddStep}>
                <PlusCircle />
            </AppButton>
        </div>
    )
})