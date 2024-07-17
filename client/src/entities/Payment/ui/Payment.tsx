import cls from './Payment.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo} from 'react'

interface PaymentProps {
  className?: string;
}
export const Payment = memo(({className} : PaymentProps) => {

    return ( 
        <div className={classNames(cls.Payment, {}, [className])}>
      
        </div>
    )
})