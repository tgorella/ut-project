import cls from './ProductDetailsPage.module.scss'
import {memo} from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import BACK_ICON from '@/shared/assets/img/undo.svg'
import {ProductCard } from '@/entities/Product'

 
export const ProductDetailsPage = memo(() => {
    const {t} = useTranslation('product')  
    let {id} = useParams()
    const history = useNavigate()
    const goBack = () => history(-1)

    if (__PROJECT__ === 'storybook') {
        id = '64469ad32e53c6aa4c0746b6'
    }

    return ( <VStack max gap='20'>
        <HStack align='start' max>
            <VStack max gap='20' className={cls.big_column}>
                <HStack max className={cls.nav_menu}>
                    <AppButton stretch={true} theme={ButtonTheme.SOLID} onClick={goBack}><BACK_ICON className={cls.icon}/> {t('Назад')}</AppButton>
                    {/* {!error && id &&
                            <DeleteProductButton 
                                productId={id} 
                                buttonTheme={ButtonTheme.OUTLINED_GRAY}
                                buttonText={t('Удалить товар')}
                            />
                            } */}
                </HStack>
                {id && <ProductCard id={id} />}
            </VStack>  
        </HStack>
    </VStack>
    )
})