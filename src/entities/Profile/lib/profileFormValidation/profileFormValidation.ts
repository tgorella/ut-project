import { Profile } from 'entities/Profile/model/types/profileSchema'
import i18n from 'shared/config/i18n/i18n'

const profileFormValidation = (data: Profile) => {
    const errors = {
        age: '',
        firstname: '',
        lastname: '',
        avatar: '',
        city: ''
    }
   
    const onlyLetters = /[^а-яА-Яa-zA-Z]+/g
    const onlyLettersNumbers = /[^а-яА-Яa-zA-Z0-9\-\s]+/g
    const linkRegEx = /^(http)/g

    const {age, firstname, lastname, city, avatar} = data
    if (!firstname || firstname.trim().length === 0) {
        errors.firstname = i18n.t('Поле не может быть пустым')
    }
    if (firstname) {
        if (firstname.trim().length > 20) {
            errors.firstname =  i18n.t('Имя не должно превышать 20 символдов')
        }
        if (onlyLetters.test(firstname)) {
            errors.firstname =  i18n.t('Имя должно содержать только буквы')
        }
    }
    
    if (!lastname || lastname.trim().length === 0) {
        errors.lastname = i18n.t('Поле не может быть пустым')
    }

    if (lastname) {
        if (lastname.trim().length > 30) {
            errors.lastname =  i18n.t('Фамилия не должно превышать 30 символдов')
        }
        if (onlyLetters.test(lastname)) {
            errors.lastname =  i18n.t('Фамилия должна содержать только буквы')
        }
    }

    if (!city || city.trim().length === 0) {
        errors.city = i18n.t('Поле не может быть пустым')
    }
    if (city) {
        if (city.trim().length > 30) {
            errors.city =  i18n.t('Город не должно превышать 30 символдов')
        }
        if (onlyLettersNumbers.test(city)) {
            errors.city =  i18n.t('Город может содержать только буквы, цифры и \'-\'')
        }
    }
    if (!age) {
        errors.age=i18n.t('Поле не может быть пустым')
    }
    if (age) {
        if (age < 0) {
            errors.age= i18n.t('Возраст не может быть орицательным')
        }
        if (age < 13|| age > 100) {
            errors.age= i18n.t('Возраст должен быть в пределах от 13 до 100')
        }
    }
    if (avatar) {
        if (!linkRegEx.test(avatar)) {
            errors.avatar =  i18n.t('Ссылка должна быть вида http://...')
        }
    }
    
    return errors
}

export default profileFormValidation