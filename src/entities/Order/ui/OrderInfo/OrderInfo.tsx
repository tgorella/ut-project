import cls from './OrderInfo.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'

interface OrderInfoProps {
  className?: string;
}
export const OrderInfo = ({className} : OrderInfoProps) => {

    return ( 
        <div className={classNames(cls.OrderInfo, {}, [className])}>
      
        </div>
    )
}