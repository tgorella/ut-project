import cls from './Calendar.module.scss'
import { BodyObj } from './lib/genCalendarBodyObj'

interface CalendarBodyProps {
  days: BodyObj
}
export const CalendarBody = ({days} : CalendarBodyProps) => {

    return (  
        <div className={cls.bodyWrapper}> 
            {days.map((day) => {
                return (<div key={day.number} className={day.number ? cls.day: ''}>{day.number}</div>)
            })}
        </div>
    )
}