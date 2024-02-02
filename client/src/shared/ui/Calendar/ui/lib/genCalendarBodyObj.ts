import { Event } from 'entities/Event'
import { Order } from 'entities/Order'
import { CurrentDate } from './vars'

interface BodyObjItem {
  number?: number,
  events?: (Order | Event)[]
}

export type BodyObj = BodyObjItem[]


export const genCalendarBodyObj = (thisMonthEvents: (Order | Event)[] = [], currentDate: CurrentDate, totalDays: number): BodyObj => {
    const monthStart = new Date(currentDate.year, currentDate.month, 1).getDay()
    const bodyObj: BodyObj = []

    if (monthStart > 0) {
        for (let i = 1; i < monthStart; i++) {
            bodyObj.push({number: undefined})
        }
    }

    for (let j = 1; j <= totalDays; j++ ) {
        const events = thisMonthEvents.filter((el) => new Date(el.eventDate).getDate() === j)
        bodyObj.push({number: j, events: events})
    }

    return bodyObj
}