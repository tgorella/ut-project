import cls from './Product.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useCallback, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@/shared/ui/Box'
import { EditSwitcher } from '@/widgets/EditeSwitcher'
import { ImageSlider } from '@/shared/ui/ImageSlider/ui/ImageSlider'
import { ProductForm } from '../ProductForm'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getProductDetailsIsLoading } from '@/entities/Product/model/selectors/getProductDetailsIsLoading/getProductDetailsIsLoading'
import { PageLoader } from '@/widgets/PageLoader'
import { productDetailsAction, productDetailsReducer } from '../../model/slice/productDetailsSlice'
import { getProductById } from '../../model/services/getProductById/getProductById'
import { updateProduct } from '../../model/services/updateProduct/updateProduct'
import { getProductDetailsForm } from '../../model/selectors/getProductDetailsForm/getProductDetailsForm'
import { Alert, AlertTheme } from '@/shared/ui/Alert'
import { getProductDetailsError } from '../../model/selectors/getProductDetailsError/getProductDetailsError'
import { aLertInformerAction } from '@/widgets/ALertInformer'

interface ProductProps {
  className?: string;
  id: string
}

const reducers: ReducersList = {
    productDetails: productDetailsReducer
}

export const ProductCard = memo(({className, id} : ProductProps) => {
    const {t} = useTranslation('product')
    const dispatch = useAppDispatch()
    const product = useSelector(getProductDetailsForm)
    const resParams = '_id name price discount count productType description img category subcategory productCode'
    const isLoading = useSelector(getProductDetailsIsLoading)
    const error = useSelector(getProductDetailsError)
    const [editMode, setEditMode] = useState(false)
    const currency = '₽'
    const [errors] = useState({
        name: '',
        price: '',
        img: '',
        category: '',
        subcategory: '',
        description: '',
        productCode: '',
        productType: '',
        count: '',
        discount: ''
    })    
    const toggleEditMode = () => {
        setEditMode((prev) => !prev)
    }
    
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(getProductById({id, resParams}))
        }
    }, [dispatch, id])

    const handleChangeName = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({name: val}))
    }, [dispatch])

    const handleChangeDescription = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({description: val}))
    }, [dispatch])

    const handleChangeProductCode = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({productCode: val}))
    }, [dispatch])

    const handleChangeProductType = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({productType: val}))
    }, [dispatch])

    const handleChangePrice = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({price: Number(val)}))
    }, [dispatch])

    const handleChangeCount = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({count: Number(val)}))
    }, [dispatch])

    const handleChangeDiscount = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({discount: Number(val)}))
    }, [dispatch])

    const handleChangeImage = useCallback((val: string[]) => {
        dispatch(productDetailsAction.updateProduct({img: val}))
    }, [dispatch])

    const handleChangeCategory = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({category: val}))
    }, [dispatch])

    const handleChangeSubcategory = useCallback((val: string) => {
        dispatch(productDetailsAction.updateProduct({subcategory: val}))
    }, [dispatch])

    const handleChancelEdit = useCallback(() => {
        dispatch(productDetailsAction.cancelEdit())
        setEditMode(false)
    }, [dispatch])

    const handleSaveProduct = useCallback(() => {
        dispatch(updateProduct(id)).then((data) => {
            const id = Date.now().toString()
            if (data.meta.requestStatus === 'fulfilled') {
                dispatch(aLertInformerAction.addMessage({
                    message: 'Продукт успешно обновлен',
                    type: AlertTheme.SUCCESS,
                    id: id
                }))
                setTimeout(() => {
                    dispatch(aLertInformerAction.removeMessage(id))
                }, 10000)
            }
            toggleEditMode()})
    }, [dispatch, id])


    if (isLoading) {
        return <PageLoader />
    }

    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Box>
                <EditSwitcher 
                    className={cls.edit_switcher}
                    editMode={editMode} 
                    onEdit={toggleEditMode} 
                    onCancelEdit={toggleEditMode} />
                {error && <Alert theme={AlertTheme.WARNING} text={t('Не удалось загрузить информацию о товаре')} />}
                {!editMode && product &&<div className={classNames(cls.Product, {}, [className])}>
                    <ImageSlider images={product.img} previewSide='left' withPreview={true} />
                    <div className={cls.description_wrapper}>
                        <p className={cls.category}>{t('Категория')}: {product.category}</p>
                        <h2>{product.name}</h2>
                        <p className={cls.price}>{t('Стоимость')}: {(product.price - product.discount) + ' ' + currency } <span className={cls.oldPrice}>{product.price >( product.price - product.discount) ? product.price + ' ' + currency : ''}</span></p>
                        <p className={cls.description_title}>{t('Описание')}:</p>
                        <p className={cls.description}>{product.description}</p>
                    </div>
                </div>}
                {editMode && <ProductForm 
                    product={product} 
                    isNew={false}
                    onChangeName={handleChangeName}
                    onChangeDescription={handleChangeDescription}
                    onChangeProductCode={handleChangeProductCode}
                    onChangeProductType={handleChangeProductType}
                    onChangePrice={handleChangePrice}
                    onChangeCount={handleChangeCount}
                    onChangeDiscount={handleChangeDiscount}
                    onChangeImage={handleChangeImage}
                    onChancelEdit={handleChancelEdit}
                    onSaveProduct={handleSaveProduct}
                    onChangeCategory={handleChangeCategory}
                    onChangeSubcategory={handleChangeSubcategory}
                    errors={errors}
                />}
            </Box>
        
        </DynamicModuleLoader>
    )
})