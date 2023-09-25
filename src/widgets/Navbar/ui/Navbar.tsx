import classNames from 'shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { useState, useCallback, memo } from 'react'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userAction } from 'entities/User'

interface NavbarProps {
  className?: string;
}
export const Navbar = memo(({className} : NavbarProps) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const toggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev)
    }, [])

    const handleLogout = () => {
        dispatch(userAction.logout())
    }

    if (!authData || authData.username === '' ) {
        return ( 
            <div className={classNames(cls.Navbar, {}, [className])}>
                <div className={classNames(cls.switcherWrapper)}>
                    <LangSwitcher />
                    <ThemeSwitcher />
                </div> 
                <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Войти')}</AppButton>
                <LoginModal isOpen={isAuthModal} onClose={toggleModal} />
            </div>
        )
    }
    return ( 
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.switcherWrapper)}>
                <LangSwitcher />
                <ThemeSwitcher />
            </div> 
            {authData.username !== '' && <AppButton theme={ButtonTheme.SOLID} onClick={handleLogout}>{t('Выйти')}</AppButton> }
        </div>
    )
})