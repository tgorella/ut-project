/* eslint-disable react/display-name */
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import cls from './SidebarItem.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import { SidebarItemType } from '../../model/items'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { useSelector } from 'react-redux'
import { isUserManager, isUserOwner } from '@/entities/Profile'
import { UserRole } from '@/entities/Profile/model/types/profileSchema'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean;
}
export const SidebarItem = memo(({item, collapsed} : SidebarItemProps) => {
    const {t} = useTranslation()
    const isOwner = useSelector(isUserOwner)
    const isManager = useSelector(isUserManager)

    const isAvailable = () => {
        if (!item.roles) {
            return true
        }

        if ((item.roles?.includes(UserRole.OWNER) && isOwner) || (item.roles?.includes(UserRole.MANAGER) && isManager)) {
            return true
        }

        return false
    }
    return ( 
        <>
            {isAvailable() &&
            <AppLink to={item.path} className={classNames(cls['menu-item'], {[cls.collapsed]: collapsed}, [cls.link])}>
                <item.icon className={cls.icon}/>
                <div>{t(item.text)}</div>
            </AppLink>
            }
        </>
        
    )
})