import { useTranslation } from 'react-i18next'
import cls from './Calendar.module.scss'


export const CalendarDaysNameRow = () => {
    const {t} = useTranslation()

    return ( 
        <div className={cls.daysWrapper}> 
            <div className={cls.dayName}>{t('пн')}</div>
            <div className={cls.dayName}>{t('вт')}</div>
            <div className={cls.dayName}>{t('ср')}</div>
            <div className={cls.dayName}>{t('чт')}</div>
            <div className={cls.dayName}>{t('пт')}</div>
            <div className={cls.dayName}>{t('сб')}</div>
            <div className={cls.dayName}>{t('вс')}</div>
        </div>
    )
}