import cls from './Textarea.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo} from 'react'


interface TextareaProps {
  className?: string;
  onChange?: (val: string) => void,
  rows?: number,
  name: string,
  value: string,
  label?: string
}
export const Textarea = memo(({className, onChange, rows, name, value, label} : TextareaProps) => {
    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        onChange?.(e.target.value)
    }
    return ( 
        <fieldset className={cls.group}>
            {label && <legend className={cls.legend}>{label}</legend>}
            <textarea 
                name={name}
                rows={rows}
                onChange={handleChange}
                value={value}
                className={classNames(cls.Textarea, {}, [className])} />
      
        </fieldset>
 
    )
})