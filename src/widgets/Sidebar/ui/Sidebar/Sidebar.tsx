import { memo, useMemo, useState } from 'react'
import cls from './Sidebar.module.scss'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import classNames from 'shared/lib/classNames/ClassNames'
import { SidebarItemsList } from 'widgets/Sidebar/model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import LOGO from 'shared/assets/img/logo.png'
import { getProfileModules } from 'entities/Profile'
import { Modules } from 'entities/Profile/model/types/profileSchema'


interface SidebarProps {
  className?: string
}
export const Sidebar = memo(({ className = ''}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const authData = useSelector(getUserAuthData) ?? {username: ''}
    const modules = useSelector(getProfileModules)
    
    const toggleSidebar = () => {
        setCollapsed((prevState) => !prevState)
    }

    const itemsList = useMemo( () => SidebarItemsList.map((item) => {
        if (authData?.username !== '' && item.isAuth) {
            if (modules) {
                if (item.module && modules[item.moduleName as keyof Modules] ) {
                    return <SidebarItem item={item} collapsed={collapsed} key={item.path}/>}
            }
           
            if (!item.module) {
                return <SidebarItem item={item} collapsed={collapsed} key={item.path}/>}
        }
        
        if ((!authData?.username || authData.username === '') && !item.isAuth) {
            return <SidebarItem item={item} collapsed={collapsed} key={item.path}/>}
    } 
    ), [authData.username, collapsed, modules])


    return (
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className
            ])}
        >
            <img src={LOGO} className={cls.logo} />
            <div className={cls.list}>
                {itemsList}
            </div>
            <AppButton 
                square 
                theme={ButtonTheme.SOLID}
                size={ButtonSize.XL} 
                data-testid="sidebar-toggle" 
                className={cls.toggle_btn} 
                onClick={toggleSidebar} >
                {!collapsed ? '«': '»'}
            </AppButton>
        </div>
    )
})
