import { AppButton } from 'shared/ui/AppButton/AppButton'
import { HStack } from 'shared/ui/HStack/HStack'
import cls from './Calendar.module.scss'
import { CurrentDate, monthInfo } from './lib/vars'
import { useTranslation } from 'react-i18next'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarHeaderProps {
  currentDate: CurrentDate,
  onNextMont: () => void,
  onPrevMonth: () => void,
  onToday: () => void
}
export const CalendarHeader = ({currentDate, onNextMont, onPrevMonth, onToday} : CalendarHeaderProps) => {

    const {t} = useTranslation()

    return ( 
        <HStack className={cls.navWrapper}>
            <div className={cls.monthName}>
                {monthInfo(currentDate.year)[currentDate.month as keyof typeof monthInfo].name} {currentDate.year}
            </div>
            <HStack>
                <AppButton title={t('Назад')} onClick={onPrevMonth}><ChevronLeft size={32} /></AppButton>
                <AppButton title={t('Вперед')} onClick={onNextMont}><ChevronRight size={32} /></AppButton>
                <AppButton title={t('Сегодня')} onClick={onToday}>{t('Сегодня')}</AppButton>
            </HStack>
        </HStack>
    )
}