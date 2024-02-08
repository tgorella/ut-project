import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback, useState} from 'react'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { getUserAuthData, userAction } from 'entities/User'
import { LoginModal } from 'features/AuthByUsername'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { profileAction } from 'entities/Profile'
import { appModulesAction } from 'entities/AppModules'


interface AuthButtonProps {
  className?: string;
}
export const AuthButton = memo(({className} : AuthButtonProps) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const toggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev)
    }, [])

    const handleLogout = () => {
        dispatch(userAction.logout())
        dispatch(profileAction.logOut())
        dispatch(appModulesAction.logOut())
        navigate?.('/')
  
    }
       

    if (!authData || authData._id === '' ) {
        return ( 
            <div className={classNames(className, {}, [])}>
                <AppButton theme={ButtonTheme.SOLID} onClick={toggleModal}>{t('Войти')}</AppButton>
                <LoginModal isOpen={isAuthModal} onClose={toggleModal} />
            </div>
        )
    }
    return ( 
        <div className={classNames(className, {}, [])}>
            {authData._id !== '' && <AppButton theme={ButtonTheme.SOLID} onClick={handleLogout}>{t('Выйти')}</AppButton> }
        </div>
    )
})