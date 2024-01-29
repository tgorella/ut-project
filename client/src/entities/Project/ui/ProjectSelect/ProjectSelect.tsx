import cls from './ProjectSelect.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Project } from '../../model/types/Project'
import { Option, Select } from 'shared/ui/Select'
import { useTranslation } from 'react-i18next'


interface ProjectSelectProps {
  className?: string;
  projects: Project[],
  value: string
  onChange: (val: string) => void,
}
export const ProjectSelect = memo(({className, projects, value, onChange} : ProjectSelectProps) => {
    const {t} = useTranslation('project')
    const options: Option[] = projects.map((project) => {
        return {name: project.name, value: project._id}
    })

    return ( 
        <div className={classNames(cls.ProjectSelect, {}, [className])}>
            <Select options={options} value={value} label={t('Проект')} onChange={onChange}/>
        </div>
    )
})