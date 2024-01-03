/* eslint-disable react/display-name */
import { AppLink } from 'shared/ui/AppLink/AppLink'
import cls from './SidebarItem.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { SidebarItemType } from 'widgets/Sidebar/model/items'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'

interface SidebarItemProps {
  item: SidebarItemType
  collapsed: boolean;
}
export const SidebarItem = memo(({item, collapsed} : SidebarItemProps) => {
    const {t} = useTranslation()
    return ( 
        <AppLink to={item.path} className={classNames(cls['menu-item'], {[cls.collapsed]: collapsed}, [cls.link])}>
            <item.icon className={cls.icon}/>
            <div>{t(item.text)}</div>
        </AppLink>
    )
})