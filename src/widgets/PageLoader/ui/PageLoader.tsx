import { useTranslation } from 'react-i18next'
import cls from './PageLoader.module.scss'
import { Spinner } from 'shared/ui/Spinner/Spinner'
import classNames from 'shared/lib/classNames/ClassNames'
import { memo } from 'react'

interface PageLoaderProps {
  className?: string
}
export const PageLoader = memo(({ className }: PageLoaderProps) => {
    const { t } = useTranslation()
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Spinner />
            <div>{t('Загрузка')}</div>
        </div>
    )
})
