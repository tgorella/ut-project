import cls from './LoginForm.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useTranslation } from 'react-i18next'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Input } from 'shared/ui/Input/Input'

interface LoginFormProps {
  className?: string;
}
export const LoginForm = ({className} : LoginFormProps) => {
    const { t } = useTranslation()
    return ( 
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input type='text' placeholder={t('Введите username')} autoFocus  rounded/>
            <Input type='password' placeholder={t('Введите пароль')} rounded/>
            <AppButton theme={ButtonTheme.OUTLINED}>
                {t('Войти')}
            </AppButton>
        </div>
    )
}