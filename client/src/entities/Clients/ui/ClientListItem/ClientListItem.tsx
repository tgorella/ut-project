import cls from './ClientListItem.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { Client } from '../../model/types/clientSchema'
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar'
import { Link } from 'react-router-dom'
import FavIcon from 'shared/assets/img/fav.svg'


interface ClientListItemProps {
  className?: string;
  client: Client
}
export const ClientListItem = memo(({className,client} : ClientListItemProps) => {
    return ( 
        <Link to={'/clients/'+ client._id} className={classNames(cls.ClientListItem, {}, [className])}>
            <div className={cls.nameCol}>
                <Avatar src={client.avatarUrls} size={AvatarSize.S} />
                {client.name}</div>
            <div>{client.email}</div>
            <div className={cls.only_pc}>{client.profession}</div>
            <div className={cls.icon_block}> {client.isFav &&  <FavIcon  className={cls.icon}/>}</div>
        </Link>
    )
})