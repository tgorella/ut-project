/* eslint-disable react/display-name */
import cls from './LoginForm.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { loginAction } from 'features/AuthByUsername/model/slice/loginSlice'
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { Text } from 'shared/ui/Text'
import { Alert, AlertTheme } from 'shared/ui/Alert'

interface LoginFormProps {
  className?: string;
}
export const LoginForm = memo(({className} : LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { username, password, error, isLoading} = useSelector(getLoginState)

    const handleChangeUsername = useCallback((value: string) => {
        dispatch(loginAction.setUsername(value))
    }, [dispatch])

    const handleChangePassword = useCallback((value: string) => {
        dispatch(loginAction.setPassword(value))
    }, [dispatch])

    const handleLogIn = useCallback(()=> {
        dispatch(loginByUsername({username, password}))
    }, [dispatch, password, username])

    return ( 
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            <Input type='text' placeholder={t('Введите username')} autoFocus  rounded onChange={handleChangeUsername} value={username}/>
            <Input type='password' placeholder={t('Введите пароль')} rounded onChange={handleChangePassword} value={password}/>
            {error && <Alert theme={AlertTheme.ERROR} text={error}/>}
            <AppButton theme={ButtonTheme.OUTLINED} onClick={handleLogIn} disabled={isLoading}>
                {t('Войти')}
            </AppButton>
        </div>
    )
})