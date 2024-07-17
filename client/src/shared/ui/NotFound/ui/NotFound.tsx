import cls from './NotFound.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import ICON_404 from '@/shared/assets/img/404.png'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface NotFoundProps {
  className?: string;
}
export const NotFound = ({className} : NotFoundProps) => {

    const {t} = useTranslation()
    
    const location = useLocation()
    let text
    switch (location.pathname.split('/')[1]) {
    case 'events':
        text = 'Ой! Такого события не существует'
        break
    case 'client':
        text = 'Ой! Такого клиента не существует'
        break
    case 'orders':
        text = 'Ой! Такого заказа не существует'
        break
    case 'products':
        text = 'Ой! Такого товара не существует'
        break
    default:
        text = 'Такая страница не существует'
        break
    }

    return ( 
        <div className={classNames(cls.NotFound, {}, [className])}>
            <img src={ICON_404} title="Not found" alt={t('Not found')}/>
            <div className={cls.text}>{text}</div>
        </div>
    )
}