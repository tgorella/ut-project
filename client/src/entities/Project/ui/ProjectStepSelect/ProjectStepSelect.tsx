import cls from './ProjectStep.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { Select } from 'shared/ui/Select'
import { Option } from 'shared/ui/Select/model/types/option'

interface ProjectStepSelectProps {
  stepValue: string,
  onChange: (val: string) => void
}
export const ProjectStepSelect = memo(({stepValue, onChange} : ProjectStepSelectProps) => {

    const status = ['', 'В процессе', 'Готово', 'Пауза', 'Проблема']
    const values = ['none', 'in_progress', 'done', 'paused', 'warning']
    const [colorClass, setColorClass] = useState( stepValue || '')

    const handleChangeStatus = (value: string) => {
        setColorClass(value)
        onChange(value)
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