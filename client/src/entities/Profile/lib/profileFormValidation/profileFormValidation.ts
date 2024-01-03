import { Profile } from 'entities/Profile/model/types/profileSchema'
import i18n from 'shared/config/i18n/i18n'

interface MethodInfo {
  message: string;
  value?: number;
  min?: number;
  max?: number
}

type Method = Record<string, MethodInfo>

const profileFormValidation = (data: Profile) => {
    const errors = {
        age: '',
        firstname: '',
        lastname: '',
        avatar: '',
        city: '',
        currency: '',
        username: '',
        country: '',
        lastOrderNumber: '',
        modules: ''
    }
   
    const config : Record<string, Method>= {
        firstname: {
            isRequired: { 
                message: i18n.t('Поле не может быть пустым')
            },
            length: {
                message:i18n.t('Имя не должно превышать 20 символдов'),
                value: 20 
            },
            onlyLetters: {
                message:  i18n.t('Имя должно содержать только буквы')
            }
        },
        lastname: {
            isRequired: { 
                message: i18n.t('Поле не может быть пустым')
            },
            length: {
                message: i18n.t('Фамилия не должна превышать 30 символдов'),
                value: 30 
            },
            onlyLetters: {
                message:   i18n.t('Фамилия должна содержать только буквы')
            }
        },
        city: {
            isRequired: { 
                message: i18n.t('Поле не может быть пустым')
            },
            length: {
                message: i18n.t('Город не должно превышать 30 символдов'),
                value: 30 
            },
            onlyLettersNumbers: {
                message:   i18n.t('Город может содержать только буквы, цифры и \'-\'')
            }
        },
        age: {
            isRequired: { 
                message: i18n.t('Поле не может быть пустым')
            },
            value: {
                message: i18n.t('Возраст должен быть в пределах от 13 до 100'),
                min: 13,
                max: 100
            }
        },
        avatar: {
            isLink: {
                message: i18n.t('Ссылка должна быть вида http://...'),
            }
        }
    }

    function validate(method: string, value: string | number , config: MethodInfo): string | undefined {
        switch (method) {
        case 'isRequired':
            if (!value) {
                return config.message
            }
            if (typeof value === 'string' && value.trim() === '') {
                return config.message
            }
            break
        case 'length':
            if (typeof value !== 'number') {
                if (config['value'] && value.length > config?.['value']) {
                    return config.message
                }
            }
            break
        case 'onlyLetters':
            if (typeof value !== 'number' && notLetters.test(value)) {
                return config.message
            }
            break
        case 'value':
            if ((config.min && config.max) && (Number(value) < config.min || Number(value) > config.max)) {
                return config.message
            }
            break
        case 'isLink':
            if (typeof value !== 'number' && !linkRegEx.test(value)) {
                return config.message
            }
            break
        case 'onlyLettersNumbers': 
            if (typeof value !== 'number' && notLettersNumbers.test(value)) {
                return config.message
            }
            break
        default:
            break
        }
    }
    const notLetters = /[^а-яА-Яa-zA-Z]+/g
    const notLettersNumbers = /[^а-яА-Яa-zA-Z0-9\-\s]+/g
    const linkRegEx = /^(http)/g

    for (const fieldName in data) {
        for (const method in config[fieldName]) {
            // @ts-ignore
            const error = validate(method, data[fieldName], config[fieldName][method])
            if (error) {
                errors[fieldName as keyof Profile] = error
            }
        }
    }
    return errors
}

export default profileFormValidation