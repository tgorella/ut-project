import classNames from 'shared/lib/classNames/ClassNames'
import { Modal } from 'shared/ui/Modal'
import { LoginForm } from '../LoginForm/LoginForm'

interface LoginModalProps {
  className?: string;
  isOpen: boolean,
  onClose: () => void
}
export const LoginModal = ({className, isOpen, onClose} : LoginModalProps) => {
    return ( 
        <Modal 
            lazy={true}
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}>
            <LoginForm />
        </Modal>
    )
}