/* eslint-disable react/display-name */
import React, { InputHTMLAttributes, memo, useState } from 'react'
import cls from './Input.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import ShowIcon from '@/shared/assets/img/show.svg'
import HideIcon from '@/shared/assets/img/hide.svg'
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
    // @ts-ignore
    let formatedValue = ''

    function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'tel') {
            let validateValue = e.target.value.replace(/\D/g, '')
            if (validateValue[0] === '9') validateValue = '7'+ validateValue

            
            if (['7','8','9'].includes(validateValue[0])) {
                const firsSymbols = (validateValue[0] === '8') ? '8': '+7'

                formatedValue = firsSymbols + ' '

            
                if (validateValue.length > 1) {
                    formatedValue += '(' + validateValue.substring(1, 4) 
                }
                if (validateValue.length >= 5) {
                    formatedValue += ') ' + validateValue.substring(4, 7) 
                }
                if (validateValue.length > 7) {
                    formatedValue += ' ' + validateValue.substring(7, 9)
                }
                if (validateValue.length > 9) {
                    formatedValue += ' ' + validateValue.substring(9,11)
                }

            } else {
                formatedValue = '+'+ validateValue
           
            }
            onChange?.(formatedValue)
        } else {
            onChange?.(e.target.value)
        }
        
    }
    function handlePhoneKeyDown (e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Backspace' && (formatedValue.trim().length === 1 || (formatedValue.trim().length === 2 && formatedValue.includes('+')))) {
          
            onChange?.(formatedValue = '')
            
        }
    }
    if (type === 'password') {
        return ( <>
            {label && <fieldset className={classNames(cls.group, Mods, [className])}>
                <legend className={cls.legend}>{label}</legend>
                <div className={cls.Input}>
                    <input value={value} type={showPass ? 'text' : type} onChange={changeHandler}
                        className={classNames(className, Mods, [])}
                        {...otherProps}
                    />
                    <div className={cls.eye_btn} onClick={showPassHandle}>{showPass ? <HideIcon />: <ShowIcon className={cls.icon}/>}</div>
                </div>
                {error && <Alert 
                    text={error} 
                    theme={AlertTheme.ERROR} 
                    variant={AlertVariant.ONLY_TEXT}
                />}
            </fieldset>}
            {!label && <div className={classNames(cls.group, Mods, [className])}>
                <div className={cls.Input}>
                    <input value={value} type={showPass ? 'text' : type} onChange={changeHandler}
                        className={classNames(className, Mods, [])}
                        {...otherProps}
                    />
                    <div className={cls.eye_btn} onClick={showPassHandle}>{showPass ? <HideIcon />: <ShowIcon className={cls.icon}/>}</div>
                </div>
                {error && <Alert 
                    text={error} 
                    theme={AlertTheme.ERROR} 
                    variant={AlertVariant.ONLY_TEXT}
                />}
            </div>}
        </>
            
            
        )
    }
    return ( <>
        {label  && <fieldset className={classNames(cls.group, Mods, [className])}>
            <legend className={cls.legend}>{label}</legend>
            <div className={cls.Input}>
                <input 
                    value={value} 
                    type={type} 
                    onChange={changeHandler} 
                    {...otherProps}
                    onKeyDown={ (type === 'tel')  ? handlePhoneKeyDown : () => {}}
                />
                {error && <Alert 
                    text={error} 
                    theme={AlertTheme.ERROR} 
                    variant={AlertVariant.ONLY_TEXT}
                />
                }
            </div>
        </fieldset>}
        {!label && <div className={classNames(cls.group, Mods, [cls.Input, className])}>
            <input 
                value={value} 
                type={type} 
                onChange={changeHandler} 
                {...otherProps}
                onKeyDown={ (type === 'tel')  ? handlePhoneKeyDown : () => {}}
            />
            {error && <Alert 
                text={error} 
                theme={AlertTheme.ERROR} 
                variant={AlertVariant.ONLY_TEXT}
            />}
        </div>}
    </>
         
    )
})