import cls from './AppModules.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback} from 'react'
import { useSelector } from 'react-redux'
import { getUserModulesData } from '../model/selectors/getUserModulesData/getUserModulesData'
import { getUserModulesIsLoading } from '../model/selectors/getUserModulesIsLoading/getUserModulesIsLoading'
import { getUserModulesError } from '../model/selectors/getUserModulesError/getUserModulesError'
import { PageLoader } from 'widgets/PageLoader'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { appModulesAction } from '../model/slice/AppModulesSlice'
import { AppModules } from '../model/types/AppModules'
import { updateModules } from '../model/services/updateModules/updateModules'

interface AppModulesProps {
  className?: string;
}
export const AppModulesBlock = memo(({className} : AppModulesProps) => {
    const {t} = useTranslation()
    const modules = useSelector(getUserModulesData)
    const isLoading = useSelector(getUserModulesIsLoading)
    const error = useSelector(getUserModulesError)
    const dispatch = useAppDispatch()


    const toggleStatus = useCallback((value: Partial<AppModules>) => {
        dispatch(appModulesAction.updateModulesVisibility(value))
        if (modules) {
            dispatch(updateModules(modules._id))
        }
    }, [dispatch, modules])

    if (isLoading) {
        return <PageLoader />
    }

    if (error) {
        return <p>{t('Что-то пошло не так')}</p>
    }

    return ( 
        <div className={classNames(cls.AppModules, {}, [className])}>
            <div>
                {t('Разделом не пользуетесь? Просто скройте его.')}
            </div>
            
            <div className={cls.item} >
                <div className={classNames(cls.switcherWrapper, {}, [className])}>
                    <div onClick={() => toggleStatus({clients: !modules?.clients})} className={classNames(cls.themeSwitcher, {}, [modules?.clients ? cls.on : cls.off])}>
                        <div className={classNames(cls.button)}></div>
                    </div>
                </div>
                <div className={cls.item_name}>{t('Клиенты')}</div>
            </div>
            <div className={cls.item} >
                <div className={classNames(cls.switcherWrapper, {}, [className])}>
                    <div onClick={() => toggleStatus({orders: !modules?.orders})} className={classNames(cls.themeSwitcher, {}, [modules?.orders ? cls.on : cls.off])}>
                        <div className={classNames(cls.button)}></div>
                    </div>
                </div>
                <div className={cls.item_name}>{t('Заказы')}</div>
            </div>
        </div>
    )
})