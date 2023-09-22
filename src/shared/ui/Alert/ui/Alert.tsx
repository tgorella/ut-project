import cls from './Alert.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import ErrorIcon from 'shared/assets/img/error.svg'
import WarningIcon from 'shared/assets/img/warning.svg'
import InfoIcon from 'shared/assets/img/info.svg'
import SuccessIcon from 'shared/assets/img/success.svg'


export enum AlertTheme {
WARNING= 'warning',
INFO = 'info',
ERROR = 'error',
SUCCESS = 'success'
}

export enum AlertVariant {
  SOLID = 'solid',
  OUTLINED = 'outlined'
}

interface AlertProps {
  className?: string;
  text: string,
  description?: string,
  theme: AlertTheme,
  variant?: AlertVariant
}
export const Alert = ({className, text, description, theme = AlertTheme.INFO, variant=AlertVariant.SOLID} : AlertProps) => {
    const Mods = {
        [cls[theme]]: true,
        [cls[variant]]: true
    }

    let icon

    switch (theme) {
    case AlertTheme.ERROR:
        icon = <ErrorIcon />
        break
    case AlertTheme.SUCCESS:
        icon = <SuccessIcon />
        break
    case AlertTheme.WARNING:
        icon = <WarningIcon />
        break
    default:
        icon = <InfoIcon />
    }
    
    return ( 
        <div className={classNames(cls.Alert, Mods, [className])}>
            <div className={cls.icon}>
                {icon}
            </div>
            <div className={cls.text_wrapper}>
                {text && <p className={cls.text}>{text}</p>}
                {description && <p className={cls.description}>{description}</p>}
            </div>
            
        </div>
    )
}