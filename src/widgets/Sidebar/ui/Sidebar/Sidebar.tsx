import { useState } from 'react'
import cls from './Sidebar.module.scss'
import { AppButton, ButtonSize } from 'shared/ui/AppButton/AppButton'
import classNames from 'shared/lib/classNames/ClassNames'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/img/home.svg'
import AboutIcon from 'shared/assets/img/about.svg'

interface SidebarProps {
  className?: string
}
export const Sidebar = ({ className = ''}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed((prevState) => !prevState)
    }
    const {t} = useTranslation()

    return (
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className
            ])}
        >
            <div className={cls.list}>
                <AppLink to={RoutePath.main} className={cls.link}><MainIcon className={cls.icon}/><div>{t('Главная страница')}</div></AppLink>
                <AppLink to={RoutePath.about}  className={cls.link}><AboutIcon  className={cls.icon}/><div>{t('О сайте')}</div></AppLink>
            </div>
            <AppButton square size={ButtonSize.XL} data-testid="sidebar-toggle" className={cls.toggle_btn} onClick={toggleSidebar}>{!collapsed ? '«': '»'}</AppButton>
        </div>
    )
}
