import classNames from 'shared/lib/classNames/ClassNames'
import cls from './LangSwitcher.module.scss'
import { useTranslation } from 'react-i18next'
import { memo, useState } from 'react'

export enum Lang {
  RU = 'ru',
  ENG = 'en',
}

interface LangSwitcherProps {
  className?: string
}
export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { i18n } = useTranslation()

    const [lang, setLang] = useState(i18n.language || Lang.RU)

    const toggleLanguage = async () => {
        const newLang = i18n.language === Lang.RU ? Lang.ENG : Lang.RU
        await i18n.changeLanguage(newLang)
        setLang(newLang)
    }
    return (
        <div className={classNames(cls.switcherWrapper, {}, [className])}>
            <div
                onClick={toggleLanguage}
                className={classNames(cls.langSwitcher, {}, [
                    lang === Lang.RU ? cls.rus : cls.eng,
                ])}
            >
                <div className={classNames(cls.button)}></div>
            </div>
        </div>
    )
})
