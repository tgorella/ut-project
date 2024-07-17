import cls from './Step.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import { RefObject, memo, useState} from 'react'
import { ProjectStep } from '../../model/types/Project'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'
import React from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { updateStep } from '../../model/services/updateStep/updateStep'
import { deleteProjectStep } from '../../model/services/deleteStep/deleteStep'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'


interface StepProps {
  className?: string;
  step: ProjectStep,
}
export const Step = memo(({className, step} : StepProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation('project')
    const contentEditable: RefObject<HTMLElement>  = React.createRef()
    const [value, setValue] = useState(step.name || '')

    const handleChange = (event: ContentEditableEvent) => {
        setValue(event.target.value)
    }

    const handleSave = () => {
        if (step.name !== value) {
            dispatch(updateStep({_id: step._id, name: value}))
        }
    }
    const handleDelete = (id: string) => {
        dispatch(deleteProjectStep(id))
    }

    return ( 
        <div className={classNames(cls.Step, {}, [className])}>
            <ContentEditable
                className={cls.step_title}
                innerRef={contentEditable}
                html={value} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={handleChange} // handle innerHTML change
                onBlur={handleSave}
            />
            <AppButton 
                title={t('Удалить шаг')}
                theme={ButtonTheme.CLEAR} 
                onClick={() => handleDelete(step._id)} 
                className={cls.delBtn} >
                <Trash2 />
            </AppButton>
        </div>
    )
})