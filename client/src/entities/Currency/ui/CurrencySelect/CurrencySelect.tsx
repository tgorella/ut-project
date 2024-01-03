import { Select } from 'shared/ui/Select'
import classNames from 'shared/lib/classNames/ClassNames'
import { Currency } from '../../model/types/сurrency'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CurrencySelectProps {
  className?: string;
  value?: Currency
  onChange: (value: Currency) => void
}

const options = Object.keys(Currency).map((key) =>{
    // @ts-ignore
    return {value: Currency[key], name: Currency[key]}
} )

export const CurrencySelect = memo(({className, value, onChange} : CurrencySelectProps) => {
    const {t} = useTranslation()
    const changeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    },[onChange])


    return ( 
        <Select className={classNames(className, {}, [])} 
            options={options} 
            value={value as string} 
            onChange={changeHandler}
            label={t('Укажите валюту')}
        />
    )
})