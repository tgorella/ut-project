import cls from './ProjectsPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect} from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchProjects } from 'entities/Project'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { projectsPageReducer } from '../model/slice/ProjectsPageSlice'

interface ProjectsPageProps {
  className?: string;
}

const reducers: ReducersList = {
    projectPage: projectsPageReducer
}
export const ProjectsPage = memo(({className} : ProjectsPageProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchProjects())
        }
    })
    return ( 
        <DynamicModuleLoader reducers={reducers} >
            <div className={classNames(cls.ProjectsPage, {}, [className])}>
                <h1>{t('Projects')}</h1>
            </div>
        </DynamicModuleLoader>
        
    )
})