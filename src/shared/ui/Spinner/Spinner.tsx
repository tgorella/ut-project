import classNames from 'shared/lib/classNames/ClassNames'
import './Spinner.scss'

interface SpinnerProps {
  className?: string
}
export const Spinner = ({ className = '' }: SpinnerProps) => {
    return (
        <div className={classNames('lds-roller', {}, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
