import { useState } from 'react'
import cls from './Sidebar.module.scss'
import { AppButton } from 'shared/ui/AppButton/AppButton'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'

interface SidebarProps {
  className?: string
}
export const Sidebar = ({ className = ""}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed((prevState) => !prevState)
  }
  const { t } = useTranslation();
  return (
    <div
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <AppButton className={cls.toggle_btn} onClick={toggleSidebar}>{!collapsed ? "«": '»'}</AppButton>
    </div>
  )
}
