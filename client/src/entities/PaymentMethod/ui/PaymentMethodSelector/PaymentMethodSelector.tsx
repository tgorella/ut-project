import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getPaymentMethodsData } from '../../model/selectors/getPaymentMethodsData/getPaymentMethodsData'
import cls from './PaymentMethodSelector.module.scss'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { getPaymentMethodById } from '../../model/selectors/getPaymentMethodById/getPaymentMethodById'
import { Input } from '@/shared/ui/Input/Input'
import { PaymentMethod } from '../../model/types/PaymentMethod'
import { getPaymentMethodsIsLoading } from '../../model/selectors/getPaymentMethodsIsLoading/getPaymentMethodsIsLoading'
import { getPaymentMethodsError } from '../../model/selectors/getPaymentMethodsError/getPaymentMethodsError'
import { Alert, AlertTheme } from '@/shared/ui/Alert'

interface PaymentMethodSelectorProps {
  value: string,
  onChange?: (value: string) => void
}

export const PaymentMethodSelector = memo(({ onChange, value}: PaymentMethodSelectorProps) => {
    const variants = useSelector(getPaymentMethodsData)
    const isLoading = useSelector(getPaymentMethodsIsLoading)
    const error = useSelector(getPaymentMethodsError)
    const [currentMethod, setCurrentMethod] = useState(useSelector(getPaymentMethodById(value)))
    const {t} = useTranslation()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState('')

    const filteredVariants = variants?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))

    const handleToggleList = () => {
        setVisible(!visible)
    }

    const handleSetSearch = (val: string) => {
        setSearch(val)
    }

    const handleChooseVariant = (el: PaymentMethod) => {
        onChange?.(el._id)
        setCurrentMethod(el)
        handleToggleList()
    }
   
    if (isLoading) {
        return <div>{t('Загрузка')}</div>
    }

    if (error) {
        return <Alert theme={AlertTheme.ERROR} text={t('Произошла ошибка')}/> 
    }

    return <fieldset className={cls.group}>
        <legend className={cls.legend}>{t('Метод оплаты')}</legend>
        <AppButton stretch={true} theme={ButtonTheme.OUTLINED_LIGHT} onClick={handleToggleList}>{value ? currentMethod?.name : t('Выберите метод оплаты')}</AppButton>
        <div className={cls.list_wrapper + ' ' + (visible ? '' : cls.hidden )} >
            <Input label={t('Поиск')} onChange={handleSetSearch}/>
            {filteredVariants?.map((item) => {
                return (
                    <div key={item._id} className={cls.list_item} onClick={() => handleChooseVariant(item)} >
                        {item.icon_url ? (<img src={item.icon_url} alt={item.name}  className={cls.item__image}/>) : (<span></span>)}
                        <span>{item.name}</span>
                    </div>
                )
            })}
        </div>
    </fieldset>
})