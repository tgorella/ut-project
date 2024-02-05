import { t } from 'i18next'

interface MonthData {
  name: string,
  days: number
}

export interface CurrentDate {
  year: number,
  month: number,
  day: number,
}
export const monthInfo: (val: number) => {[key : number]: MonthData} = (year: number) => {
    return ({
        0: {name: t('Январь'), days: 31},
        1: {name: t('Февраль'), days:year % 4 === 0 ? 29 : 28 },
        2: {name: t('Март'), days: 31},
        3: {name: t('Апрель'), days: 30},
        4: {name: t('Май'), days: 31},
        5: {name: t('Июнь'), days: 30},
        6: {name: t('Июль'), days: 31},
        7: {name: t('Август'), days: 31},
        8: {name: t('Сентябрь'), days: 30},
        9: {name: t('Октябрь'), days: 31},
        10: {name: t('Ноябрь'), days: 30},
        11: {name: t('Декабрь'), days: 31}
    })}