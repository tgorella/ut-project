import cls from './PaymentMethod.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'

interface PaymentMethodProps {
  className?: string;
}
export const PaymentMethod = memo(({className} : PaymentMethodProps) => {

  return ( 
    <div className={classNames(cls.PaymentMethod, {}, [className])}>
      
    </div>
   );
})