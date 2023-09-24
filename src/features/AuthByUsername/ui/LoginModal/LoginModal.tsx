import classNames from 'shared/lib/classNames/ClassNames'
import { Modal } from 'shared/ui/Modal'
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy'
import { Suspense } from 'react'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'

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
            <Suspense fallback={<PageLoader />}>
                <LoginFormLazy />
            </Suspense>
        </Modal>
    )
}