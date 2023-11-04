import classNames from 'shared/lib/classNames/ClassNames'
import './Spinner.scss'
import { memo } from 'react'

interface SpinnerProps {
  className?: string
}
export const Spinner = memo(({ className = '' }: SpinnerProps) => {
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
})
