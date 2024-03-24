import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useCallback, useState} from 'react'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { getUserAuthData, userAction } from 'entities/User'
import { LoginModal } from 'features/AuthByUsername'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProfileData, profileAction } from 'entities/Profile'
import { appModulesAction } from 'entities/AppModules'
import { Dropdown } from 'shared/ui/Dropdown'
import { Avatar, AvatarSize } from 'shared/ui/Avatar/Avatar'
import { DropDownItem } from 'shared/ui/Dropdown/ui/Dropdown'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { HStack } from 'shared/ui/Stack/HStack/HStack'
import cls from './AuthButton.module.scss'

interface AuthButtonProps {
  className?: string;
}
export const AuthButton = memo(({className} : AuthButtonProps) => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const userData = useSelector(getProfileData)
    const toggleModal = useCallback(() => {
        setIsAuthModal((prev) => !prev)
    }, [])

    const handleLogout = () => {
        dispatch(userAction.logout())
        dispatch(profileAction.logOut())
        dispatch(appModulesAction.logOut())
        navigate?.('/')
  
    }
    const items: DropDownItem[] = [
        {
            content: t('Настройки'),
            href: RoutePath.settings

        },  
        {
            content: t('Выйти'),
            onClick: handleLogout
                       
        }
    ]

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
            <Dropdown 
                items={items}
                trigger={<HStack gap='10'>
                    <div className={cls.name}>{userData?.firstname + ' ' + userData?.lastname}</div>
                    <Avatar  src={userData?.avatar} size={AvatarSize.S} />
                </HStack>} 
                // eslint-disable-next-line i18next/no-literal-string
                position={'bottom-right'} 
            />
        </div>
    )
})