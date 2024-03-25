import i18n from 'shared/config/i18n/i18n'
import { RegistrationFormSchema } from '../../types/loginSchema'

interface MethodInfo {
  message: string;
  value?: number;
  min?: number;
  max?: number
}

type Method = Record<string, MethodInfo>

const registrationFormValidation = (data: RegistrationFormSchema) => {
    const errors = {
        email: '',
        password: '',
        repeatPassword: '',
        lastname: '',
        firstname: ''
    }
   
    const config : Record<string, Method>= {
        email: {
            isRequired: {
                message: i18n.t('Поле не может быть пустым')
            },
            isEmail: {
                message: i18n.t('Неверно указаны данные')
            }
        },
        password: {
            isRequired: {
                message: i18n.t('Поле не может быть пустым')
            },
            passReg: {
                message: i18n.t('Пароль должен содержать от 8 до 15 символов и включать 1 заглавную букву, 1 строчную и 1 цифру')
            },
            notLatin: {
                message: i18n.t('Пароль должен быть латиницей')
            }
        },
        repeatPassword: {
            isRequired: {
                message: i18n.t('Поле не может быть пустым')
            },
            equalPass: {
                message: i18n.t('Пароли должны совпадать')
            }
        },
        firstname: {
            isRequired: {
                message: i18n.t('Поле не может быть пустым')
            },
        },
        lastname: {
            isRequired: {
                message: i18n.t('Поле не может быть пустым')
            },
        }
    }

    function validate(method: string, value: string | number , config: MethodInfo): string | undefined {
        switch (method) {
       
        case 'length':
            if (typeof value !== 'number') {
                if (config['max'] && value.length > config?.['max']) {
                    return config.message
                }
                if (config['min'] && value.length < config?.['min']) {
                    return config.message
                }
            }
            break
        case 'equalPass': 
            if (data.repeatPassword !== data.password) {
                return config.message
            }
            break
        case 'passReg':
            if (data.password !== '' && !passRegEx.test(String(value))) {
                return config.message
            }
            break
        case 'notLatin':
            if (data.password !== '' && !notLatin.test(String(value))) {
                return config.message
            }
            break
        case 'isEmail':
            if (data.email !== '' && !mailRegEx.test(String(value))) {
                return config.message
            }
            break
        case 'isRequired':
            if (!value) {
                return config.message
            }
            if (typeof value === 'string' && value.trim() === '') {
                return config.message
            }
            break
        default:
            break
        }
    }
    const mailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const passRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const notLatin = /[^а-яА-Я]+/g

    for (const fieldName in data) {
        for (const method in config[fieldName]) {
            // @ts-ignore
            const error = validate(method, data[fieldName], config[fieldName][method])
            if (error) {
                errors[fieldName as keyof typeof errors] = error
            }
        }
    }
    return errors
}

export default registrationFormValidation