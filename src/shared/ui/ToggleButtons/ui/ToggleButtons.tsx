import cls from './ToggleButtons.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'

export type ToggleButtonValue = {
  title: string,
  value: number | string
}

export enum ToggleSize {
  S = 'small',
  M = 'medium',
  L = 'large'
}
interface ToggleButtonsProps {
  className?: string;
  onChange:(val: number | string) => void,
  values: ToggleButtonValue[],
  size?: ToggleSize
currentValue: string | number
}
export const ToggleButtons = memo(({className, onChange, values, size = ToggleSize.S, currentValue} : ToggleButtonsProps) => {

    return ( 
        <div className={classNames(cls.ToggleButtons, {}, [className])}>
            {values.map((el) => {
                return <div 
                    key={el.title} 
                    onClick={() => onChange(el.value)} 
                    className={classNames(cls.item, {[cls.selected]: el.value === currentValue }, [cls[size]])}>
                    {el.title}
                </div>
            })}
        </div>  
    )
})