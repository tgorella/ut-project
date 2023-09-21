import classNames from 'shared/lib/classNames/ClassNames'
import { Modal } from 'shared/ui/Modal'
import { LoginForm } from '../LoginForm/LoginForm'
import {
    useTranslation } from 'react-i18next'
interface LoginModalProps {
  className?: string;
  isOpen: boolean,
  onClose: () => void
}
export const LoginModal = ({className, isOpen, onClose} : LoginModalProps) => {
    const { t } = useTranslation()
    return ( 
        <Modal 
            lazy={true}
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}>
            <p>{t('Войти')}</p>
            <LoginForm />
        </Modal>
    )
}