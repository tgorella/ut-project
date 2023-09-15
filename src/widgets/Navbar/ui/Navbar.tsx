import classNames from 'shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'

interface NavbarProps {
  className?: string;
}
export const Navbar = ({className} : NavbarProps) => {

 
    return ( 
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.switcherWrapper)}>
                <LangSwitcher />
                <ThemeSwitcher />
            </div> 
        </div>
    )
}