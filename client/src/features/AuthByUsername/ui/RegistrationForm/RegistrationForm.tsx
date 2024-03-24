import cls from './RegistrationForm.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo, useState} from 'react'
import formGenerator, { FormItem, FromComponent } from 'shared/lib/formGenerator/formGenerator'
import registrationFormValidation from '../../model/lib/registrationFormValidation/registrationFormValidation'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useTranslation } from 'react-i18next'
import { signUp } from '../../model/services/signUp/signUp'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'


interface RegistrationFormProps {
  className?: string;
  onSuccess: () => void
}
export const RegistrationForm = memo(({className, onSuccess} : RegistrationFormProps) => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const [regData, setRegData] = useState({email: '', password: '', repeatPassword: '', firstname: '', lastname: ''})
    const [errors, setErrors] = useState({email: '', password: '', repeatPassword: '', firstname: '', lastname: ''})

    const handleChangePassword = (val: string) => {
        setRegData({...regData, password: val})
    }
    const handleChangeFirstName = (val: string) => {
        setRegData({...regData, firstname: val})
    }

    const handleChangeLastName = (val: string) => {
        setRegData({...regData, lastname: val})
    }
    const handleChangeEmail = (val: string) => {
        setRegData({...regData, email: val})
    }
    const handleChangeRepeatPassword = (val: string) => {
        setRegData({...regData, repeatPassword: val})
    }

    const handleSignUp = async () => {
        const errors = registrationFormValidation(regData)
        setErrors(errors)
        
        if (Object.values(errors).filter((item) => item !== '').length === 0) {
            const result = await dispatch(signUp({
                email: regData.email, 
                password: regData.password, 
                firstname: regData.firstname, 
                lastname: regData.lastname
            }))
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess()
            }
        }
        
    }

    const formSchema : Array<FormItem>= [
        {
            label: t('Имя'),
            valuePath: 'firstname',
            onChange: handleChangeFirstName,
            name: 'firstname',
            type: 'text',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'name',
                rounded: true,
            }
        },
        {
            label: t('Фамилия'),
            valuePath: 'lastname',
            onChange: handleChangeLastName,
            name: 'lastname',
            type: 'text',
            component: FromComponent.INPUT,
            otherProps: {
                autoComplete: 'lastname',
                rounded: true,
            }
        },
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
                    
                    onClick={handleSignUp}
                    theme={ButtonTheme.OUTLINED} 
                    stretch={true}
                    type='button'
                >{t('Зарегистрироваться')}</AppButton>
            </form>
        </div>
    )
})