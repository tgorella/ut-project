import { t } from 'i18next'

function greeting () {
    if (time >= 0 && time <= 5) {
        return t('Доброй ночи')
    }
    if (time >= 6 && time <= 11) {
        return t('Доброе утро')
    }
    if (time >= 12 && time <= 17) {
        return t('Добрый день')
    }
    if (time >= 18 && time <= 23) {
        return t('Добрый вечер')
    }
}
const time = new Date().getHours()

export default greeting