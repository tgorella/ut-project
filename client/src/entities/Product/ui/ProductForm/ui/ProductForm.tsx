import classNames from '@/shared/lib/classNames/ClassNames'
import cls from './ProductForm.module.scss'
import {memo, useCallback, useState} from 'react'
import {ProductType } from '@/entities/Product/model/types/Product'
import formGenerator, { FormItem, FromComponent } from '@/shared/lib/formGenerator/formGenerator'

const initialState = {
    _id: '',
    name: '',
    price: 0,
    discount: 0,
    count: 0,
    productType: ProductType.PRODUCT,
    description: '',
    img: [],
    category: '',
    subcategory: '',
    userId: ''
}
interface ProductFormProps {
  className?: string;
}
export const ProductForm = memo(({className} : ProductFormProps) => {
    const [newProduct , setNewProduct] = useState(initialState)

    const handleChangeName = (val: string) => {
        setNewProduct({...newProduct, name: val})
    }

    const handleChangeDescription = (val: string) => {
        setNewProduct({...newProduct, description: val})
    }

    const handleChangeProductType = (val: string) => {
        setNewProduct({...newProduct, productType: val as ProductType})
    }

    const handleChangePrice = useCallback((val: string ) => {
        setNewProduct({...newProduct, price: Number(val)})
    }, [newProduct])

    const handleChangeCount = useCallback((val: string ) => {
        setNewProduct({...newProduct, count: Number(val)})
    }, [newProduct])

    const handleChangeDiscount = useCallback((val: string ) => {
        setNewProduct({...newProduct, discount: Number(val)})
    }, [newProduct])

    const formSchema: FormItem[] = [
        {
            onChange: handleChangeName,
            name: 'name',
            label: 'Название',
            valuePath: 'name',
            component: FromComponent.INPUT,
            otherProps: {
                type: 'text',
                spellcheck: true,
            }
        },
        {
            onChange: handleChangeDescription,
            name: 'description',
            label: 'Описание',
            valuePath: 'description',
            component: FromComponent.TEXTAREA,
            otherProps: {
                type: 'text',
                spellcheck: true,
                rows: '3'
            }
        },
        {
            name: 'category',
            label: 'Категория',
            valuePath: 'category',
            component: FromComponent.SELECT,
            selectOptions: [
                {
                    value: 'design',
                    name: 'Дизайн'
                }
            ],
            onChange: () => {},
        },
        {
            onChange: handleChangeProductType,
            name: 'productType',
            label: 'Тип продукта',
            valuePath: 'productType',
            component: FromComponent.SELECT,
            selectOptions: [
                {
                    value: 'service',
                    name: 'Услуга'
                },
                {
                    value: 'product',
                    name: 'Товар'}
            ]
        },
        ...(newProduct.productType === 'product' 
            ? [{
                name: 'count',
                label: 'Количество',
                valuePath: 'count',
                component: FromComponent.INPUT,
                onChange: handleChangeCount,
                otherProps: {
                    type: 'number',
                    inputMode: 'tel'
                }
            }] 
            : [] ),
        {
            name: 'price',
            label: 'Цена',
            valuePath: 'price',
            component: FromComponent.INPUT,
            onChange: handleChangePrice,
            otherProps: {
                type: 'number',
                inputMode: 'tel'
            }
        },
        {
            name: 'discount',
            label: 'Скидка',
            valuePath: 'discount',
            component: FromComponent.INPUT,
            onChange: handleChangeDiscount,
            otherProps: {
                type: 'number',
                inputMode: 'tel'
            }
        },
        {
            name: 'img',
            label: 'Изображения',
            valuePath: 'img',
            component: FromComponent.INPUT,
            onChange: () => {},
            otherProps: {
                type: 'file'
            }
        }

    ]
    return ( 
        <form className={classNames(cls.ProductForm, {}, [className])}>
            {formGenerator(formSchema, newProduct, {})}
        </form>
    )
})