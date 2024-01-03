import { useTranslation } from 'react-i18next'
import cls from './NotFoundPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { memo } from 'react'

interface NotFoundPageProps {
  className?: string
}
export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
    const { t } = useTranslation()
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>
            <h1>{t('Такой страницы не существует')}</h1>
        </div>
    )
})
