import { Product } from '../../model/types/Product'
import { memo } from 'react'
import ProductListItem from '../ProductListItem/ProductListItem'
import classNames from 'shared/lib/classNames/ClassNames'
import cls from './ProductList.modules.scss'

interface ProductListProps {
  data: Product[]
  onDelete: (id: string) => void
  className?: string
}
const ProductList = memo(({className, data, onDelete}: ProductListProps) => {
    return (
        <div className={classNames(cls.ProductList, {}, [className])}>
            {data.map((product: Product) => {
                return <ProductListItem key={product._id} product={product} onDelete={onDelete} />
            })}
        </div>
    )
})

export default ProductList