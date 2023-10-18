/* eslint-disable react/display-name */
import { InputHTMLAttributes, memo, useState } from 'react'
import cls from './Input.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import ShowIcon from 'shared/assets/img/show.svg'
import HideIcon from 'shared/assets/img/hide.svg'


type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string,
  rounded?: boolean,
  value?: string,
  onChange?: (el: string) => void
}
export const Input = memo((props:InputProps) => {
    const {
        className, 
        rounded, 
        value, 
        onChange,
        type = 'text',
        ...otherProps} = props

    const Mods = {
        [cls.rounded]: rounded || false
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
            <div className={cls.Input}>
                <input value={value} type={showPass ? 'text' : type} onChange={changeHandler}
                    className={classNames(className, Mods, [])}
                    {...otherProps}
                />
                <div className={cls.eye_btn} onClick={showPassHandle}>{showPass ? <HideIcon />: <ShowIcon/>}</div>
            </div>
        )
    }
    return ( 
        <div className={cls.Input}>
            <input value={value} type={type} onChange={changeHandler}
                className={classNames(className, Mods, [])}
                {...otherProps}
            />
        </div>
    )
})