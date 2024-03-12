import cls from './RegistrationForm.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import formGenerator, { FormItem, FromComponent } from 'shared/lib/formGenerator/formGenerator'
import registrationFormValidation from '../../model/lib/registrationFormValidation/registrationFormValidation'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'
import { signUp } from '../../model/services/signUp/signUp'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'


interface RegistrationFormProps {
  className?: string;
}
export const RegistrationForm = memo(({className} : RegistrationFormProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const [regData, setRegData] = useState({email: '', password: '', repeatPassword: ''})
    const [errors, setErrors] = useState({email: '', password: '', repeatPassword: ''})

    const handleChangePassword = (val: string) => {
        setRegData({...regData, password: val})
    }

    const handleChangeEmail = (val: string) => {
        setRegData({...regData, email: val})
    }
    const handleChangeRepeatPassword = (val: string) => {
        setRegData({...regData, repeatPassword: val})
    }

    const handleSignUp = () => {
        dispatch(signUp({email: regData.email, password: regData.password}))
    }
    useEffect(() => {
        if (regData) {
            setErrors(registrationFormValidation(regData))   
        }
    }, [regData])

    const formSchema : Array<FormItem>= [
        {
            label: t('Email'),
            valuePath: 'email',
            onChange: handleChangeEmail,
            name: 'email',
            type: 'email',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'email',
                rounded: true,
            }
        },
        {
            label: t('Новый пароль'),
            valuePath: '',
            onChange: handleChangePassword,
            name: 'password',
            type: 'password',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'new-password',
                rounded: true
            }
        },
        {
            label: t('Повторите пароль'),
            valuePath: '',
            onChange: handleChangeRepeatPassword,
            name: 'repeatPassword',
            type: 'password',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'new-password',
                rounded: true
            }
        }
    ]
    return ( 
        <div className={classNames(cls.RegistrationForm, {}, [className])}>
            <h1>{t('Регистрация')}</h1>
            <form>
                {formGenerator(formSchema,regData,errors)}
                <AppButton 
                    disabled={Object.values(errors).filter((item) => item !== '').length > 0 ? true : false}
                    onClick={handleSignUp}
                    theme={ButtonTheme.OUTLINED} 
                    stretch={true}
                >{t('Зарегистрироваться')}</AppButton>
            </form>
        </div>
    )
})