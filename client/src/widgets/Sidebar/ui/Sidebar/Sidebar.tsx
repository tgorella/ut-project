import { memo, useMemo, useState } from 'react'
import cls from './Sidebar.module.scss'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import classNames from 'shared/lib/classNames/ClassNames'
import { SidebarItemsList } from '../../model/items'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User'
import LOGO from 'shared/assets/img/logo.png'
import { getUserModulesData } from 'entities/AppModules'
import { AppModules } from 'entities/AppModules/model/types/AppModules'
import { AuthButton } from 'widgets/AuthButton'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'


interface SidebarProps {
  className?: string
}
export const Sidebar = memo(({ className = ''}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const authData = useSelector(getUserAuthData) ?? {_id: ''}
    const modules = useSelector(getUserModulesData)
    
    const toggleSidebar = () => {
        setCollapsed((prevState) => !prevState)
    }

    const itemsList = useMemo( () => SidebarItemsList.map((item) => {
        if (authData._id !== '' && item.isAuth) {
            if (modules) {
              
                if (item.module && modules[item.moduleName as keyof AppModules] ) {
                    return <SidebarItem item={item} collapsed={collapsed} key={item.path}/>}
            }
           
            if (!item.module) {
                return <SidebarItem item={item} collapsed={collapsed} key={item.path}/>}
        }
        
        if ((!authData?._id || authData._id === '') && !item.isAuth) {
            return <SidebarItem item={item} collapsed={collapsed} key={item.path}/>}
    } 
    ), [authData._id, collapsed, modules])


    return (
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className
            ])}
        >
            <img src={LOGO} className={cls.logo} />
            <div className={cls.links_wrapper}>
                <div className={cls.list}>
                    {itemsList}
                </div>
                <div>
                    <div className={cls.only_mobile}>
                        <div className={cls.switcher_wrapper}>
                            <LangSwitcher />
                            <ThemeSwitcher />
                        </div>
                        <AuthButton className={cls.btn} />
                    </div>
                </div>
                
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
