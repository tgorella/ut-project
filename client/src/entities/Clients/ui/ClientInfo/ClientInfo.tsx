import { useTranslation } from 'react-i18next'
import { Client } from '../../model/types/clientSchema'
import cls from './ClientInfo.module.scss'
import { Avatar, AvatarSize } from '@/shared/ui/Avatar/Avatar'

interface ClientInfoProps {
  data: Client
}
export const ClientInfo = ({ data} : ClientInfoProps) => {

    const {t} = useTranslation('clients')
    
    return ( 
        <div className={cls.info_container}>
            <Avatar className={cls.avatar} src={data?.avatarUrls} size={AvatarSize.XL} alt={data?.name}/>
            <div className={cls.item}>
                <p className={cls.name}>
                    {data?.name}
                </p>
            </div>
            {data?.email && <div className={cls.item}>
                {t('Почта')}: {data?.email}
            </div>}
            {data?.phone && <div className={cls.item}>
                {t('Телефон')}: {data?.phone}
            </div>}
            {data?.address && <div className={cls.item}>
                {t('Адрес')}: {data?.address}
            </div>}
            {data?.profession && <div className={cls.item}>
                {t('Профессия')}: {data?.profession}
            </div>}
            {data?.telegram && <div className={cls.item}>
                {t('Телеграм')}: {data?.telegram}
            </div>}
            {data?.instagram && <div className={cls.item}>
                {t('Инстаграм')}: {data?.instagram}
            </div>}
            
        </div>
    )
}