import { memo } from 'react'
import cls from './PageError.module.scss'
import { useTranslation } from 'react-i18next'
import classNames from '@/shared/lib/classNames/ClassNames'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'

interface PageErrorProps {
  className?: string
}
export const PageError = memo(({ className }: PageErrorProps) => {
    const { t } = useTranslation()
    const reloadPage = () => {
        location.reload()
    }

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <h1>{t('Произошла непредвиденная ошибка')}</h1>
            <p>{t('Мы уже над ней работаем')}</p>
            <AppButton onClick={reloadPage} theme={ButtonTheme.SOLID}>{t('Перезагрузить страницу')}</AppButton>
        </div>
    )
})
