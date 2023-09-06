import { useState } from 'react'
import cls from './Sidebar.module.scss'
import { AppButton } from 'shared/ui/AppButton/AppButton'
import classNames from 'shared/lib/classNames/ClassNames'
import React from 'react'

interface SidebarProps {
  className?: string
}
export const Sidebar = ({ className = ''}: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () => {
        setCollapsed((prevState) => !prevState)
    }
    return (
        <div
            data-testid='sidebar'
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                className
            ])}
        >
            <AppButton data-testid="sidebar-toggle" className={cls.toggle_btn} onClick={toggleSidebar}>{!collapsed ? '«': '»'}</AppButton>
        </div>
    )
}
