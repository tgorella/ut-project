import cls from './ProductDetailsPage.module.scss'
import {memo, useEffect} from 'react'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { HStack, VStack } from '@/shared/ui/Stack'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { productDetailsPageReducer } from '../model/slice/ProductDetailsPageSlice'
import { getProductDetailsError } from '../model/selectors/getProductDetailsError/getProductDetailsError'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { Box } from '@/shared/ui/Box'
import BACK_ICON from '@/shared/assets/img/undo.svg'
import { DeleteProductButton } from '@/features/DeleteProductButton'
import { getProductById, ProductCard } from '@/entities/Product'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getProductDetailsIsLoading } from '../model/selectors/getProductDetailsIsLoading/getProductDetailsIsLoading'
import { PageLoader } from '@/widgets/PageLoader'
import { getProductDetailsForm } from '../model/selectors/getProductDetailsForm/getProductDetailsForm'

const reducers: ReducersList = {
    productDetailsPage: productDetailsPageReducer
}

// const mockData = {
//     _id: '1',
//     name: 'Product 1',
//     price: 100,
//     description: 'Диффузор для дома создаст приятную атмосферу и освежит любое помещение. Соленая карамель - это отличный декор и аромат вашего дома. Диффузор Terin House — ароматизатор воздуха на селективных французских ароматических маслах со стойкостью до 1-2 месяца. Композиция ароматизатора для квартиры «Соленая карамель» с насыщенными, но не приторными нотами создаут атмосферу свежести на площади до 30 м². Парфюм Представляет собой емкость с ароматическими маслами, в которую вставляются фибровые аромапалочки, мягко распространяющие аромат по всему пространству комнаты. Ароматизатор для дома подходит для любых помещений. Может не только наполнить туалет или ванную утонченным ароматом, но и сделать другие домашние комнаты более уютными. Тщательно продуманная формула яркого и интригующего нежного аромата освежителя для комнаты поможет нейтрализовать запахи еды на кухне. ',
//     discount: 10,
//     count: 150,
//     productType: ProductType.PRODUCT,
//     img: [
//         'https://basket-12.wbbasket.ru/vol1742/part174261/174261502/images/big/1.webp',
//         'https://basket-12.wbbasket.ru/vol1695/part169548/169548656/images/big/1.webp',
//         'https://basket-12.wbbasket.ru/vol1740/part174013/174013033/images/c516x688/1.webp',
//         'https://basket-13.wbbasket.ru/vol1921/part192181/192181377/images/big/1.webp',
//         'https://basket-14.wbbasket.ru/vol2187/part218782/218782248/images/c516x688/1.webp'
//     ],
//     category: 'Товары для дома',
//     subcategory: '',
//     userId: ''
// }     
export const ProductDetailsPage = memo(() => {
    const {t} = useTranslation('product')  
    let {id} = useParams()
    const dispatch = useAppDispatch()
    const resParams = '_id name price discount count productType description img category subcategory productCode'
    const isLoading = useSelector(getProductDetailsIsLoading)
    const error = useSelector(getProductDetailsError)
    const data = useSelector(getProductDetailsForm)
    const history = useNavigate()
    const goBack = () => history(-1)

    if (__PROJECT__ === 'storybook') {
        id = '64469ad32e53c6aa4c0746b6'
    }

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && id) {
            dispatch(getProductById({id, resParams}))
        }
    }, [dispatch, id])
    
    
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack max gap='20'>
                <h1>{t('Информация о продукте')} {data?.name}</h1>
                <HStack align='start'>
                    <div className={cls.small_column}>
                        <Box className={cls.nav_menu}>
                            <AppButton stretch={true} theme={ButtonTheme.SOLID} onClick={goBack}><BACK_ICON className={cls.icon}/> {t('Назад')}</AppButton>
                            {!error && id &&
                            <DeleteProductButton 
                                productId={id} 
                                buttonTheme={ButtonTheme.OUTLINED_GRAY}
                                buttonText={t('Удалить товар')}
                            />
                            }
                        </Box>
                    </div>
                    <VStack max gap='20' className={cls.big_column}>
                        {isLoading && <Box><PageLoader /></Box>}
                        {data && <ProductCard product={data} />}
                    </VStack>  
                </HStack>
                
            </VStack>
            
        </DynamicModuleLoader>
    )
})