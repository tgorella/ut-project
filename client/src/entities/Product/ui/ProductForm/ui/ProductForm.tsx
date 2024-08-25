import classNames from '@/shared/lib/classNames/ClassNames'
import cls from './ProductForm.module.scss'
import {memo,useState } from 'react'
import {Product, ProductType } from '@/entities/Product/model/types/Product'
import formGenerator, { FormItem, FromComponent } from '@/shared/lib/formGenerator/formGenerator'
import { useTranslation } from 'react-i18next'
import { HStack, VStack } from '@/shared/ui/Stack'
import { FileUploadArea } from '@/shared/ui/FileUpload'
import { AppButton, ButtonSize, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { aLertInformerAction } from '@/widgets/ALertInformer'
import { AlertTheme } from '@/shared/ui/Alert'
import DEL_ICON from '@/shared/assets/img/delete.svg'
import { http } from '@/shared/api/api'
import { addProduct } from '../../../model/services/addProduct/addProduct'


const initialState: Partial<Product> = {
    name: '',
    price: 0,
    discount: 0,
    count: 0,
    productType: ProductType.PRODUCT,
    description: '',
    img: [] as string[],
    category: 'Test',
    subcategory: 'Test',
}
interface ProductFormProps {
  className?: string;
  product?: Partial<Product>,
  isNew?: boolean,
  errors: Record<string, string>
  onChangeName: (val: string) => void
  onChangeDescription: (val: string) => void
  onChangeProductCode: (val: string) => void
  onChangeProductType: (val: string) => void
  onChangePrice: (val: string) => void
  onChangeCount: (val: string) => void
  onChangeDiscount: (val: string) => void
  onChangeImage: (val: string[]) => void
  onChangeCategory: (val: string) => void
  onChangeSubcategory: (val: string) => void
  onChancelEdit: () => void
  onSaveProduct: () => void
}
export const ProductForm = memo(({
    className, 
    product = initialState,
    isNew = false,
    errors,
    onChancelEdit,
    onSaveProduct,
    onChangeName,
    onChangeCategory,
    onChangeSubcategory,
    onChangeCount,
    onChangeDescription,
    onChangeDiscount,
    onChangeImage,
    onChangePrice,
    onChangeProductCode,
    onChangeProductType
} : ProductFormProps) => {
    const [newProduct, setNewProduct] = useState(initialState)
    const {t} = useTranslation('product')
    const dispatch = useAppDispatch()
    const [filesToDelete, setFilesToDelete] = useState<string[]>([])

    const handleAddImage = (val: string[] ) => {
        const newData = [...(product.img || []), ...val]
        onChangeImage(newData)
    }

    const handleDeleteImage = (val: string) => {
        const imageName = val.split('/').pop()  
        const newData = product.img?.filter(i => i !== val)
        if (newData) {
            onChangeImage(newData)
        }
        if (imageName) {
            setFilesToDelete((prev) => [...prev, imageName])
        }
    }

    const handleSaveProduct = (e: React.SyntheticEvent) => {
        e.preventDefault()
        
        if (isNew) {
            dispatch(addProduct(newProduct)).then((data) => {
                const id = Date.now().toString()
                if (data.meta.requestStatus === 'fulfilled') {
                    setNewProduct(initialState)
                    dispatch(aLertInformerAction.addMessage({
                        message: 'Продукт успешно добавлен',
                        type: AlertTheme.SUCCESS,
                        id: id
                    }))
                    setTimeout(() => {
                        dispatch(aLertInformerAction.removeMessage(id))
                    }, 10000)
                }
            })
        }
        else {
            filesToDelete.map(async file => {
                const result = await http.post('/', {
                    'query': 'mutation DeleteProductImage($fileName: String!) { deleteProductImage(fileName: $fileName) }',
                    'operation-name': 'DeleteProductImage',
                    'variables': {'fileName': file}
                })
                console.log(result)
            })
            onSaveProduct()
        }
    }
    const formSchema: FormItem[] = [
        {
            onChange: onChangeName,
            name: 'name',
            label: 'Название',
            valuePath: 'name',
            component: FromComponent.INPUT,
            otherProps: {
                type: 'text',
                spellCheck: true,
            }
        },
        {
            onChange: onChangeDescription,
            name: 'description',
            label: 'Описание',
            valuePath: 'description',
            component: FromComponent.TEXTAREA,
            otherProps: {
                type: 'text',
                spellCheck: true,
                rows: '3'
            }
        },
        {
            onChange: onChangeProductCode,
            name: 'productCode',
            label: 'Артикул',
            valuePath: 'productCode',
            component: FromComponent.INPUT,
            otherProps: {
                type: 'text'
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
                },
                {
                    value: 'development',
                    name: 'Разработка'
                }
            ],
            onChange: onChangeCategory,
        },
        {
            onChange:onChangeProductType,
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
        ...(product.productType === 'product' 
            ? [{
                name: 'count',
                label: 'Количество',
                valuePath: 'count',
                component: FromComponent.INPUT,
                onChange: onChangeCount,
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
            onChange: onChangePrice,
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
            onChange: onChangeDiscount,
            otherProps: {
                type: 'number',
                inputMode: 'tel'
            }
        }

    ]
    return <VStack max gap='20'>
        <h1>{isNew ? t('Добавить новый продукт') : t('Редактировать продукт')}</h1>
        <VStack max>
            <div className={cls.image_wrapper}>
                {product.img?.map((link, index) =>{
                    return <div key={index} className={cls.item}>
                        <AppButton 
                            theme={ButtonTheme.SOLID} 
                            square={true} 
                            className={cls['item_del-btn']} 
                            onClick={() => handleDeleteImage(link)} 
                            size={ButtonSize.S}
                        >
                            <DEL_ICON className={cls.icon}/>
                        </AppButton>
                        <img  src={link}  className={cls.img}/>
                    </div>
                }
                )}
            </div>
            <div>{t('Максимальное количество файлов: 10')}</div>
            <div>{t('Можно загрузить еще:')} {10 - (product.img ? product.img.length : 0)}</div>
            <FileUploadArea 
                multiple={true}  
                dropDownArea={false} 
                label={t('Загрузить изображения')}
                folder='products'
                onUpdateLinks={handleAddImage}
                limit={10 - (product.img ? product.img.length : 0)}
                disabled={product.img ? product.img.length === 10 : false}
            />
            <form className={classNames(cls.ProductForm, {}, [className])}>
                {formGenerator(formSchema, product, errors)}
                <HStack max gap='10'>
                    <AppButton
                        theme={ButtonTheme.GRAY}
                        stretch
                        onClick={onChancelEdit}>
                        {t('Отмена')}
                    </AppButton>
                    <AppButton
                        theme={ButtonTheme.SOLID}
                        stretch
                        onClick={handleSaveProduct}>
                        {t('Сохранить')}
                    </AppButton>
                </HStack>
            </form>
        </VStack>
    </VStack>
})