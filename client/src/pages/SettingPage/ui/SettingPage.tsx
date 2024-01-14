import cls from './SettingPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useTranslation } from 'react-i18next'
import { OrderStatusEdit } from 'widgets/OrderStatusEdit'


interface SettingPageProps {
  className?: string;
}

export const SettingPage = memo(({className} : SettingPageProps) => {
    const {t} = useTranslation('settings')

    return ( 
        <div className={classNames(cls.SettingPage, {}, [className])}>
            <h1>{t('Настройки')}</h1>
            <div>
              
            </div>
            <OrderStatusEdit />
        </div>
        
    )
})