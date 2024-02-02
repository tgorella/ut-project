import cls from './Calendar.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import { Order } from 'entities/Order'
import { Event } from 'entities/Event'
import { Vstack } from 'shared/ui/Vstack/Vstack'
import { CalendarHeader } from './CalendarHeader'
import { CurrentDate, monthInfo } from './lib/vars'
import { genCalendarBodyObj } from './lib/genCalendarBodyObj'
import { CalendarBody } from './CalendarBody'
import { CalendarDaysNameRow } from './CalendarDaysNameRow'

const today: CurrentDate = { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay()}

interface CalendarProps {
  className?: string;
  orders?: Order[],
  events?: Event[]
}


export const Calendar = memo(({className} : CalendarProps) => {
    const [currentDate, setCurrentDate] = useState(today)
    const days = genCalendarBodyObj([],currentDate, monthInfo(currentDate.year)[currentDate.month as keyof typeof monthInfo].days)
    
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
        <Vstack className={classNames(cls.Calendar, {}, [className])}>
            <CalendarHeader onNextMont={handleNextMonth} onPrevMonth={handlePrevMonth} onToday={handleToday} currentDate={currentDate} />
            <CalendarDaysNameRow />
            <CalendarBody days={days} />
        </Vstack>
    )
})