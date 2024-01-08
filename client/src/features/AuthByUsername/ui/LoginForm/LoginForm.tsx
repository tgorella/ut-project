/* eslint-disable i18next/no-literal-string */
/* eslint-disable react/display-name */
import cls from './LoginForm.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Input } from 'shared/ui/Input/Input'
import { useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { loginAction, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { Text } from 'shared/ui/Text'
import { Alert, AlertTheme } from 'shared/ui/Alert'
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail'

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
}
const LoginForm = memo(({className, onSuccess} : LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const email = useSelector(getLoginEmail)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)
    const error = useSelector(getLoginError)
    
    const handleChangeUsername = useCallback((value: string) => {
        dispatch(loginAction.setUserEmail(value))
    }, [dispatch])

    const handleChangePassword = useCallback( (value: string) => {
        dispatch(loginAction.setPassword(value))
    }, [dispatch])

    const handleLogIn = useCallback(async ()=> {
        const result = await dispatch(loginByEmail({email, password}))
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [dispatch, onSuccess, password, email])

    return ( 
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <form className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />
                <Input type='text' placeholder={t('Введите email')} autoFocus rounded onChange={handleChangeUsername} value={email}/>
                <Input type='password' placeholder={t('Введите пароль')} rounded onChange={handleChangePassword} value={password}/>
                {error && <Alert theme={AlertTheme.ERROR} text={error}/>}
                <AppButton theme={ButtonTheme.OUTLINED} onClick={handleLogIn} disabled={isLoading}>
                    {t('Войти')}
                </AppButton>
            </form>
        </DynamicModuleLoader>
       
    )
})

export default LoginForm
