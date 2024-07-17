import cls from './ClientsList.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Client } from '../../model/types/clientSchema'
import { ClientListItem } from '../ClientListItem/ClientListItem'
import {Text} from '@/shared/ui/Text'
import { TextAlign } from '@/shared/ui/Text/ui/Text'
import { useTranslation } from 'react-i18next'

interface ClientsListProps {
  className?: string;
  clients?: Client[]
}
export const ClientsList = memo(({className, clients = []} : ClientsListProps) => {
    const {t} = useTranslation()

    if (!clients || clients.length === 0) {
        return ( 
            <div className={classNames(cls.ClientsList, {}, [className])}>
                <Text text={t('Клиенты не найдены')}  align={TextAlign.CENTER}/>
            </div>
        )
    }
   
    return ( 
        <div className={classNames(cls.ClientsList, {}, [className])}>
            {
                clients.map((client) => {
                    return <ClientListItem  client={client} key={client._id} />
                
                })
            }
        </div>
    )
})