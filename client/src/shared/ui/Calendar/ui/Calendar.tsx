import cls from './Calendar.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { VStack } from 'shared/ui/Vstack/Vstack'
import { CalendarHeader } from './CalendarHeader'
import { CurrentDate, monthInfo } from './lib/vars'
import { genCalendarBodyObj } from './lib/genCalendarBodyObj'
import { CalendarBody } from './CalendarBody'
import { CalendarDaysNameRow } from './CakendarDaysNameRow'
import { useTranslation } from 'react-i18next'
import { getCalendarPageEvents } from 'pages/CalendarPage/model/selectors/getCalendarPageEvents/getCalendarPageEvents'
import { useSelector } from 'react-redux'

const today: CurrentDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay()}

interface CalendarProps {
  className?: string;
}


export const Calendar = memo(({className} : CalendarProps) => {
    const {t} = useTranslation()
    const events = useSelector(getCalendarPageEvents)
    const [currentDate, setCurrentDate] = useState(today)
    const currentMonthEvents = events?.filter((event) =>  new Date(event.eventDate).getMonth() === currentDate.month)
    const days = genCalendarBodyObj(currentMonthEvents,currentDate, monthInfo(currentDate.year)[currentDate.month as keyof typeof monthInfo].days)

    const handleNextMonth = () => {
        if (currentDate.month < 11) {
            setCurrentDate((prev) => ({...prev, month: currentDate.month + 1}))
        } else {
            setCurrentDate((prev) => ({...prev, year: currentDate.year + 1, month: 0}))
        }
    }
    const handlePrevMonth = () => {
        if (currentDate.month > 0) {
            setCurrentDate((prev) => ({...prev, month: currentDate.month - 1}))
        } else {
            setCurrentDate((prev) => ({...prev, year: currentDate.year - 1, month: 11}))
        }
    }

    const handleToday = () => {
        setCurrentDate(today)
    }

    return ( 
        <VStack className={classNames(cls.Calendar, {}, [className])}>
            <h1>{t('Календарь')}</h1>
            <CalendarHeader onNextMont={handleNextMonth} onPrevMonth={handlePrevMonth} onToday={handleToday} currentDate={currentDate} />
            <CalendarDaysNameRow />
            <CalendarBody days={days} />
        </VStack>
    )
})