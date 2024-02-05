import { ChangeEvent, memo } from 'react'
import { Option } from '../model/types/option'
import cls from './Select.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface SelectorProps {
  className?: string;
  options: Option[];
  value: string;
  label?: string;
  onChange?: (value: string) => void;
}

export const Select = memo(({className, options, value, label, onChange} : SelectorProps) => {
    const changeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value)
    }

    return ( 
        <fieldset className={cls.group}>
            {label  && <legend className={cls.legend}>{label}</legend>}
            <select className={classNames(cls.Selector, {}, [className])} onChange={changeHandler} value={value}>
                {options.map((item) => {
                    return (
                        <option value={item.value} key={item.value} disabled={!item.value}>{item.name}</option>
                    )
                })}
            </select>
        </fieldset>
        
    )
})