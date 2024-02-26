import { Event } from 'entities/Event'
import { CurrentDate } from './vars'

interface BodyObjItem {
  number?: number,
  events?: Event[]
}

export type BodyObj = BodyObjItem[]


export const genCalendarBodyObj = (thisMonthEvents: Event[] = [], currentDate: CurrentDate, totalDays: number): BodyObj => {
    const monthStart = new Date(currentDate.year, currentDate.month, 1).getDay()
    const bodyObj: BodyObj = []

    if (monthStart > 0) {
        for (let i = 1; i < monthStart; i++) {
            bodyObj.push({number: undefined})
        }
    }

    for (let j = 1; j <= totalDays; j++ ) {
        bodyObj.push({number: j, events: thisMonthEvents.filter((el) => new Date(el.eventDate).getDate() === j)})
    }

    return bodyObj
}