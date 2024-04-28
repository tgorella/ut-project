import classNames from '@/shared/lib/classNames/ClassNames'
import { Product } from '../../model/types/Product'
import cls from './ProductListItem.module.scss'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@/shared/assets/img/delete.svg'
import { Link } from 'react-router-dom'
interface ListItemProps {
  className?: string;
  product: Product,
  onDelete: (val: string) => void
}

const ProductListItem = memo(({className, product, onDelete}: ListItemProps) => {
    const {t} = useTranslation('product')

    return (
        <div className={classNames(cls.ProductListItem, {}, [className])} >
            <img className={cls.item_img} src={product?.img?.[0]} alt={product.name} />
            <div className={cls.product_name}><Link to={'/products/' + product._id}>{product.name}</Link></div>
            <div>{product.count} {t('шт.')}</div>
            <div>{product.price}</div>
            <div>{product.discount}</div>
            <div>{product.productType === 'product' ? t('товар') : t('услуга')}</div>
            <div>{product.category}</div>
            <div className={cls.del_btn} onClick={() => onDelete(product._id)}><DeleteIcon className={cls.icon} /></div>
        </div>
    )
})

export default ProductListItem