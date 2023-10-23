import classNames from 'shared/lib/classNames/ClassNames'
import { Modal } from 'shared/ui/Modal'
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy'
import { Suspense } from 'react'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'
import { useNavigate } from 'react-router-dom'

interface LoginModalProps {
  className?: string;
  isOpen: boolean,
  onClose: () => void
}
export const LoginModal = ({className, isOpen, onClose} : LoginModalProps) => {
    const navigate = useNavigate()
    const handleClose = () => {
        onClose()
        navigate('/profile')
        location.reload()
        
    }
    return ( 
        <Modal 
            lazy={true}
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}>
            <Suspense fallback={<PageLoader />}>
                <LoginFormLazy onSuccess={handleClose}/>
            </Suspense>
        </Modal>
    )
}