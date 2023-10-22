import { Option } from '../model/types/option'
import cls from './Select.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface SelectorProps {
  className?: string;
  options: Option[];
  value: string;
  label?: string;
  onChange: () => void;
}
export const Select = ({className, options, value, label, onChange} : SelectorProps) => {

    return ( 
        <fieldset className={cls.group}>
            {label  && <legend className={cls.legend}>{label}</legend>}
            <select className={classNames(cls.Selector, {}, [className])} onChange={onChange} value={value}>
                {options.map((item) => {
                    return (
                        <option value={item.value} key={item.value}>{item.name}</option>
                    )
                })}
            </select>
        </fieldset>
        
    )
}