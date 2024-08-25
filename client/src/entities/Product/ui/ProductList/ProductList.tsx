import { Product } from '../../model/types/Product'
import { memo } from 'react'
import ProductListItem from '../ProductListItem/ProductListItem'
import classNames from '@/shared/lib/classNames/ClassNames'
import cls from './ProductList.modules.scss'
import { useTranslation } from 'react-i18next'

interface ProductListProps {
  data: Product[]
  onDelete: (id: string) => void
  className?: string
}
export const ProductList = memo(({className, data, onDelete}: ProductListProps) => {
    const {t} = useTranslation('product')  
  

    return (
        <div className={classNames(cls.ProductList, {}, [className])}>
            <div className={cls.list_header}>
                <div></div>
                <div>{t('Наименование')}</div>
                <div>{t('Артикул')}</div>
                <div>{t('Количество')}</div>
                <div>{t('Цена')}</div>
                <div>{t('Скидка')}</div>
                <div>{t('Тип')}</div>
                <div>{t('Категория')}</div>
                <div></div>
            </div>
            {data.length === 0 && <p className={cls.center}>{t('Товаров для отображения нет')}</p>}
            {data.length > 0 && data.map((product: Product) => {
                return <ProductListItem key={product._id} product={product} onDelete={onDelete} />
            })}
        </div>
    )
})
