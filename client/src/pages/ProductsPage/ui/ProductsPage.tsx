import cls from './ProductsPage.module.scss'
import {memo, useCallback, useEffect, useState} from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Box } from '@/shared/ui/Box'
import { fetchAllProducts, ProductList} from '@/entities/Product'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProductsPageData } from '../model/selectors/getProductsPageData/getProductsPageData'
import { getProductsPageIsLoading } from '../model/selectors/getProductsPageIsLoading/getProductsPageIsLoading'
import { getProductsPageError } from '../model/selectors/getProductsPageError/getProductsPageError'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getProductsPageLimit } from '../model/selectors/getProductsPageLimit/getProductsPageLimit'
import { getProductsPageSearch } from '../model/selectors/getProductsPageSearch/getProductsPageSearch'
import { ToggleButtons, ToggleButtonValue } from '@/shared/ui/ToggleButtons'
import { productsPageAction, productsPageReducer } from '../model/slice/ProductsPageSlice'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Searchbar } from '@/widgets/Searchbar'
import { Pagination } from '@/shared/ui/Pagination'
import { Alert, AlertTheme } from '@/shared/ui/Alert'
import { PageLoader } from '@/widgets/PageLoader'
import { PreviewWindow } from '@/shared/ui/PreviewWindow'
import { ProductForm } from '@/entities/Product/ui/ProductForm'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'

const reducers: ReducersList = {
    productPage: productsPageReducer
}

export const ProductsPage = memo(() => {
    const {t} = useTranslation('product')
    const products = useSelector(getProductsPageData)
    const isLoading = useSelector(getProductsPageIsLoading)
    const error = useSelector(getProductsPageError)
    const dispatch = useAppDispatch()
    const limit = useSelector(getProductsPageLimit) || 25
    const [page, setPage] = useState(1)
    const search = useSelector(getProductsPageSearch) || ''
    const [openPreview, setOpenPreview] = useState(false)

    const limitsValue: ToggleButtonValue[]  = [
        {title: '15', value: 15},
        {title: '25', value: 25},
        {title: '50', value: 50},
        {title: '100', value: 100}
    ]

    const togglePreview = () => {
        setOpenPreview(!openPreview)
    }
    const handleChangePage = useCallback((num: number) => setPage(num), [])

    const handleSearch = useCallback((val: string) => {
        dispatch(productsPageAction.setSearch(val))
    }, [dispatch])

    const handleChangeLimit = useCallback((num: number | string) => {
        dispatch(productsPageAction.setLimit(Number(num)))
    }, [dispatch])

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(productsPageAction.initState())
            dispatch(fetchAllProducts({search: search, resParams: 'img _id name price discount count productType category productCode' }))
        }
    }, [dispatch, search])
    return ( 
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack max gap='20'>
                <h1>{t('Товары')}</h1>
                <HStack max gap='20' justify='between' align='center'>
                    <AppButton theme={ButtonTheme.SOLID} onClick={togglePreview}>{t('Добавить')}</AppButton>
                    <div className={cls.searchBlock}>
                        <Searchbar onChange={handleSearch} placeholder={t('Введите название товара')}/>
                    </div>
                    <HStack className={cls.toggle_item}>
                        {t('Записей на странице:')} <ToggleButtons onChange={handleChangeLimit} currentValue={limit} values={limitsValue} />
                    </HStack>
                </HStack>
                <Box>
                    {isLoading && <PageLoader/>}
                    {error && <Alert theme={AlertTheme.ERROR} text={t('Что-то пошло не так. Не удалось загрузить список товаров')}/>}
                    {!error && !isLoading && <ProductList 
                        data={products || []}
                        onDelete={() => {}}
                    />}
                </Box>
                <Pagination 
                    itemsLength={products?.length || 0} 
                    itemsPerPage={limit} 
                    currentPage={page} 
                    onPageChange={handleChangePage }
                    totalItems={!isLoading} 
                    pages={!isLoading} />
                <PreviewWindow isOpen={openPreview} onClose={togglePreview}>
                    <ProductForm isNew={true} 
                        errors={{}} 
                        onChangeName={() => {} } 
                        onChangeDescription={() => {}  } 
                        onChangeProductCode={() => {} } 
                        onChangeProductType={() => {} } 
                        onChangePrice={() => {} } 
                        onChangeCount={() => {} } 
                        onChangeDiscount={() => {} } 
                        onChangeImage={() => {} } 
                        onChangeCategory={() => {} } 
                        onChangeSubcategory={() => {} } 
                        onChancelEdit={() => {} } 
                        onSaveProduct={() => {} } />
                </PreviewWindow>
            </VStack>
        </DynamicModuleLoader>
    )
})