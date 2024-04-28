import classNames from '@/shared/lib/classNames/ClassNames'
import { Modal } from '@/shared/ui/Modal'
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy'
import { Suspense, memo, useState } from 'react'
import { PageLoader } from '@/widgets/PageLoader'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RegistrationForm } from '../RegistrationForm/RegistrationForm'

interface LoginModalProps {
  className?: string;
  isOpen: boolean,
  onClose: () => void
}
export const LoginModal = memo(({className, isOpen, onClose} : LoginModalProps) => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [login, setLogin] = useState(true)
    const handleSuccessLogin = () => {
        onClose()
        navigate('/settings')
    }
    const handleClose = () => {
        onClose()
        setLogin(true)
    }
    const toggleLogin = () => {
        setLogin(!login)
    }

    return ( 
        <Modal 
            lazy={true}
            isOpen={isOpen}
            onClose={handleClose}
            className={classNames('', {}, [className])}>
            {login && <>
                <Suspense fallback={<PageLoader />}>
                    <LoginFormLazy onSuccess={handleSuccessLogin}/>
                </Suspense>
                <p>{t('Еще нет аккаунта?')} <Link to='' onClick={toggleLogin}>{t('Регистрация')}</Link></p>
            </>
            }
            {!login && <Suspense fallback={<PageLoader />} >
                <RegistrationForm  onSuccess={handleSuccessLogin}/>
                <p>{t('Уже есть аккаунт?')} <Link to='' onClick={toggleLogin}>{t('Войти')}</Link></p>

            </Suspense>}
        </Modal>
    )
})