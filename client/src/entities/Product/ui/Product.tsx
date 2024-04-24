import cls from './Product.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'

interface ProductProps {
  className?: string;
}
export const Product = memo(({className} : ProductProps) => {

  return ( 
    <div className={classNames(cls.Product, {}, [className])}>
      
    </div>
   );
})