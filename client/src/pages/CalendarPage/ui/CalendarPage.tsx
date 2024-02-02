import cls from './CalendarPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar } from 'shared/ui/Calendar';

interface CalendarPageProps {
  className?: string;
}
export const CalendarPage = memo(({className} : CalendarPageProps) => {
    const {t} = useTranslation()
    return ( 
        <div className={classNames(cls.CalendarPage, {}, [className])}>
            <h1>{t('Календарь')}</h1>
            <Calendar />
        </div>
    )
})