import { useTranslation } from 'react-i18next'
import cls from './ClientDetailPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface ClientDetailPageProps {
  className?: string;
}
const ClientDetailPage = ({className} : ClientDetailPageProps) => {
    const {t} = useTranslation()
    return ( 
        <div className={classNames(cls.ClientDetailPage, {}, [className])}>
            <h1>{t('Client id')}</h1>
        </div>
    )
}

export default ClientDetailPage