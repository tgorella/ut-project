import cls from './ClientsList.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Client } from '../../model/types/clientsSchema'
import { Box } from 'shared/ui/Box'
import { ClientListItem } from '../ClientListItem/ClientListItem'


interface ClientsListProps {
  className?: string;
  clients?: Client[]
}
export const ClientsList = memo(({className, clients = []} : ClientsListProps) => {
   
    return ( 
        <Box className={classNames(cls.ClientsList, {}, [className])}>
            {
                clients.map((client) => {
                    return <ClientListItem  client={client} key={client.id} />
                
                })
            }
        </Box>
    )
})