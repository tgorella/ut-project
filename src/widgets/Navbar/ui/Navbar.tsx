import classNames from 'shared/lib/classNames/ClassNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { LangSwitcher } from 'widgets/LangSwitcher'
import { useState, useCallback } from 'react'
import { Modal } from 'shared/ui/Modal'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  className?: string;
}
export const Navbar = ({className} : NavbarProps) => {
    const {t} = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const toggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev)
    }, [])

 
    return ( 
        <div className={classNames(cls.Navbar, {}, [className])}>
            <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Войти')}</AppButton>
            <Modal isOpen={isAuthModal} onClose={toggleModal} onOpen={toggleModal}>
                <h1>{t('Войти')}</h1>
            </Modal>
            <div className={classNames(cls.switcherWrapper)}>
                <LangSwitcher />
                <ThemeSwitcher />
            </div> 
        </div>
    )
}