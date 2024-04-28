import cls from './AppModules.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useCallback} from 'react'
import { useSelector } from 'react-redux'
import { getUserModulesData } from '../model/selectors/getUserModulesData/getUserModulesData'
import { getUserModulesIsLoading } from '../model/selectors/getUserModulesIsLoading/getUserModulesIsLoading'
import { getUserModulesError } from '../model/selectors/getUserModulesError/getUserModulesError'
import { PageLoader } from '@/widgets/PageLoader'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { appModulesAction } from '../model/slice/AppModulesSlice'
import { ModulesKey } from '../model/types/AppModules'
import { updateModules } from '../model/services/updateModules/updateModules'
import AppModulesItem from './AppModulesItem'


interface AppModulesProps {
  className?: string;
}
export const AppModulesBlock = memo(({className} : AppModulesProps) => {
    const {t} = useTranslation()
    const modules = useSelector(getUserModulesData)
    const isLoading = useSelector(getUserModulesIsLoading)
    const error = useSelector(getUserModulesError)
    const dispatch = useAppDispatch()


    const toggleStatus = useCallback((value: ModulesKey) => {
        const data = {
            [value]: !modules?.[value]
        }
        dispatch(appModulesAction.updateModulesVisibility(data))
        if (modules) {
            dispatch(updateModules())
        }
    }, [dispatch, modules])

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <p>{t('Что-то пошло не так')}</p>
    }

    const items: {path: ModulesKey, name: string}[] = [
        {path: 'clients', name: t('Клиенты')},  
        {path: 'orders', name: t('Заказы')},
        {path: 'projects', name: t('Проекты')},
        {path: 'calendar', name: t('Календарь')}
    ]

    return ( 
        <div className={classNames(cls.AppModules, {}, [className])}>
            <div>
                {t('Разделом не пользуетесь? Просто скройте его.')}
            </div>
            {items.map(item => (
                <AppModulesItem  key={item.path} onClick={toggleStatus} item={item} status={modules?.[item.path] as boolean} />)
            )}
        </div>
    )
})