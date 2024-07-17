import classNames from '@/shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { LangSwitcher } from '@/widgets/LangSwitcher'
import { AuthButton } from '@/widgets/AuthButton'
import { memo } from 'react'

interface NavbarProps {
  className?: string;
}
export const Navbar = memo(({className} : NavbarProps) => {

    return ( 
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.switcherWrapper)}>
                <LangSwitcher />
                <ThemeSwitcher />
                <AuthButton />
            </div> 
        </div>
    )
})