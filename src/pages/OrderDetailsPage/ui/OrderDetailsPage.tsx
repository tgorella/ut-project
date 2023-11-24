import cls from './OrderDetailsPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import {memo} from 'react'
import { OrderCard} from 'entities/Order'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getOrderDetailsForm } from 'entities/Order/model/selectors/getOrderDetailsForm/getOrderDetailsForm'
import { useSelector } from 'react-redux'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { Box } from 'shared/ui/Box'
import BACK_ICON from 'shared/assets/img/undo.svg'
import { DelOrderButton } from 'widgets/DelOrderButton'
import { getOrderDetailsError } from 'entities/Order/model/selectors/getOrderDetailsError/getOrderDetailsError'

interface OrderDetailsPageProps {
  className?: string;
}

const OrderDetailsPage = memo(({className} : OrderDetailsPageProps) => {
    const {t} = useTranslation()
    let {id} = useParams()
    const orderData = useSelector(getOrderDetailsForm)

    if (__PROJECT__ === 'storybook') {
        id = '64469ad32e53c6aa4c0746b6'
    }
    
    const history = useNavigate()
    const backHandel = () => history(-1)
    const error = useSelector(getOrderDetailsError)

   
    const childrenConten = <Box className={cls.button_wrapper}>
        <AppButton theme={ButtonTheme.SOLID} onClick={backHandel}><BACK_ICON className={cls.icon}/> {t('Назад')}</AppButton>
        {!error && id &&
        <DelOrderButton 
            orderId={id} 
            buttonTheme={ButtonTheme.OUTLINED_GRAY}
            buttonText={t('Удалить заказ')}
            warningText={t('Внимание! Это действие нельзя будет отменить! Вы точно хотите удалить этот заказ?')}/>
        }
    </Box>


    return ( 
        <div className={cls.page_wrapper}>
            <h1 className={cls.title}>{t('Информация о заказе')} #{orderData?.orderNumber}</h1>
            <div className={classNames(cls.OrderDetailsPage, {}, [className])}>
                {id && <OrderCard id={id}>
                    {childrenConten}
                </OrderCard>}
            </div>
        </div>
    )
})

export default OrderDetailsPage