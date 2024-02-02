import { AppButton } from 'shared/ui/AppButton/AppButton'
import { HStack } from 'shared/ui/HStack/HStack'
import cls from './Calendar.module.scss'
import { CurrentDate, monthInfo } from './lib/vars'
import { useTranslation } from 'react-i18next'

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
            <AppButton onClick={onPrevMonth}>{t('Назад')}</AppButton>
            <div className={cls.monthName}>
                {monthInfo(currentDate.year)[currentDate.month as keyof typeof monthInfo].name} {currentDate.year}
            </div>
            <AppButton onClick={onNextMont}>{t('Вперед')}</AppButton>
            <AppButton onClick={onToday}>{t('Сегодня')}</AppButton>


        </HStack>
    )
}