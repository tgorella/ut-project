import { Select } from '@/shared/ui/Select'
import classNames from '@/shared/lib/classNames/ClassNames'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Country } from '../../model/types/country'


interface CountrySelectProps {
  className?: string;
  value?: Country
  onChange: (value: Country) => void
}

const options = Object.keys(Country).map((key) =>{
    // @ts-ignore
    return {value: Country[key], name: Country[key]}
} )

export const CountrySelect = memo(({className, value, onChange} : CountrySelectProps) => {

    const {t} = useTranslation()
    const changeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    },[onChange])


    return ( 
        <Select className={classNames(className, {}, [])} 
            options={options} 
            value={value as string} 
            onChange={changeHandler}
            label={t('Укажите страну')}
        />
    )
})