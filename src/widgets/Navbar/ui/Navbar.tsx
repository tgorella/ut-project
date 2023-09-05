import classNames from 'shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'
import { LangSwitcher } from 'widgets/LangSwitcher'

interface NavbarProps {
  className?: string;
}
export const Navbar = ({className} : NavbarProps) => {
    const {t} = useTranslation()

 
    return ( 
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.list}>
                <AppLink to={'/'}>{t('Главная страница')}</AppLink>
                <AppLink to={'/about'}>{t('О сайте')}</AppLink>
            </div>
            <div className={classNames(cls.switcherWrapper)}>
                <LangSwitcher />
                <ThemeSwitcher />
            </div> 
        </div>
    )
}