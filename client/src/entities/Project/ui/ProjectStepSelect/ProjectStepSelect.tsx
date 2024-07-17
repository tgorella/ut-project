import cls from './ProjectStep.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { Select } from '@/shared/ui/Select'
import { Option } from '@/shared/ui/Select/model/types/option'
import { useTranslation } from 'react-i18next'

interface ProjectStepSelectProps {
  stepValue: string,
  index: number,
  onChange: (index: number,val: string) => void
}
export const ProjectStepSelect = memo(({stepValue, index, onChange} : ProjectStepSelectProps) => {
    const {t} = useTranslation()
    const status = ['', t('В процессе'), t('Готово'), t('Пауза'), t('Проблема')]
    const values = ['none', 'in_progress', 'done', 'paused', 'warning']
    const [colorClass, setColorClass] = useState( stepValue || '')

    const handleChangeStatus = (value: string) => {
        setColorClass(value)
        onChange(index, value)
    }

    const options: Option[] = values.map((el, index) => {
        return {name: status[index], value: el}
    })

    return ( 
        <div className={cls.StepSelect}>
            <Select 
                className={classNames(cls[stepValue], {}, [])} 
                options={options} 
                value={colorClass} 
                onChange={handleChangeStatus} />
        </div>
        
    )
})