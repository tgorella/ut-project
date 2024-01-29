import cls from './ProjectSelect.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect} from 'react'
import { Option, Select } from 'shared/ui/Select'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProjectSelectIsLoading } from './model/selectors/getProjectSelectIsLoading/getProjectSelectIsLoading'
import { getProjectSelectData } from './model/selectors/getProjectSelectData/getProjectSelectData'
import { getProjectSelectError } from './model/selectors/getProjectSelectError/getProjectSelectError'
import { PageLoader } from 'widgets/PageLoader'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchProjects } from 'entities/Project'

interface ProjectSelectProps {
  className?: string;
  value: string
  onChange: (val: string) => void,
}
export const ProjectSelect = memo(({className, value, onChange} : ProjectSelectProps) => {
    const dispatch = useAppDispatch()  
    const isLoading = useSelector(getProjectSelectIsLoading)
    const data = useSelector(getProjectSelectData) || []
    const error = useSelector(getProjectSelectError)
    const {t} = useTranslation('project')

    const options: Option[] = data?.map((project) => {
        return {name: project.name, value: project._id}
    })

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProjects())
        }
    }, [dispatch])

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не получилось получить данные')} />
    }

    return ( 
        <div className={classNames(cls.ProjectSelect, {}, [className])}>
            <Select options={options} value={value} label={t('Проект')} onChange={onChange}/>
        </div>
    )
})