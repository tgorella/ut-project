/* eslint-disable react/display-name */
import { InputHTMLAttributes, memo, useState } from 'react'
import cls from './Input.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import ShowIcon from 'shared/assets/img/show.svg'
import HideIcon from 'shared/assets/img/hide.svg'
import { Alert, AlertTheme, AlertVariant } from '../Alert'


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string,
  rounded?: boolean,
  value?: string,
  label?: string,
  error?: string,
  onChange?: (el: string) => void
}
export const Input = memo((props:InputProps) => {
    const {
        className, 
        rounded, 
        value, 
        label,
        error,
        onChange,
        type = 'text',
        ...otherProps} = props

    const Mods = {
        [cls.nolabel]: label ? false: true,
        [cls.rounded]: rounded || false,
    }

    const [showPass, setShowPass] = useState(false)
    const showPassHandle = () => {
        setShowPass((prev) => !prev)
    }

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value)
    }

    if (type === 'password') {
        return ( 
            <fieldset className={classNames(className, Mods, [cls.group])}>
                {label  && <legend className={cls.legend}>{label}</legend>}
                <div className={cls.Input}>
                    <input value={value} type={showPass ? 'text' : type} onChange={changeHandler}
                        className={classNames(className, Mods, [])}
                        {...otherProps}
                    />
                    <div className={cls.eye_btn} onClick={showPassHandle}>{showPass ? <HideIcon />: <ShowIcon/>}</div>
                </div>
                {error && <Alert 
                    text={error} 
                    theme={AlertTheme.ERROR} 
                    variant={AlertVariant.ONLY_TEXT}
                />}
            </fieldset>
            
        )
    }
    return ( 
        <fieldset className={classNames(className, Mods, [cls.group])}>
            {label  && <legend className={cls.legend}>{label}</legend>}
            <div className={cls.Input}>
                <input 
                    value={value} 
                    type={type} 
                    onChange={changeHandler} 
                    {...otherProps}
                />
                {error && <Alert 
                    text={error} 
                    theme={AlertTheme.ERROR} 
                    variant={AlertVariant.ONLY_TEXT}
                />}
            </div>
        </fieldset>
    )
})