import { useTranslation } from 'react-i18next'
import cls from './ClientDetailPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useNavigate, useParams } from 'react-router-dom'
import { clientDetailsReducer } from 'entities/Clients/model/slice/clientDetailsSlice'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { ClientCard } from 'entities/Clients'
import { memo } from 'react'
import { Box } from 'shared/ui/Box'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import ADD_ORDER from 'shared/assets/img/add_order.svg'
import DEL_CLIENT from 'shared/assets/img/delete.svg'
import BACK_ICON from 'shared/assets/img/undo.svg'



const reducers = {
    clientDetails: clientDetailsReducer
}
interface ClientDetailPageProps {
  className?: string;
}
const ClientDetailPage = memo(({className} : ClientDetailPageProps) => {
    const {t} = useTranslation()
    const {id} = useParams()
    const history = useNavigate()

    const backHandel = () => history(-1)
    
    if (id) {
        return ( 
            <DynamicModuleLoader reducers={reducers} removeAfterUnmount >
                <div className={cls.page_wrapper}>
                    <h1 className={cls.title}>{t('Информация о клиенте')}</h1>
                    <div className={classNames(cls.ClientDetailPage, {}, [className])}>
                        <div className={cls.small_column} >
                            <Box className={cls.button_wrapper}>
                                <AppButton theme={ButtonTheme.SOLID} onClick={backHandel}><BACK_ICON className={cls.icon}/> {t('Назад')}</AppButton>
                                <AppButton theme={ButtonTheme.OUTLINED_GRAY} onClick={backHandel}><ADD_ORDER className={cls.icon}/> {t('Добавить заказ')}</AppButton>
                                <AppButton theme={ButtonTheme.OUTLINED_GRAY} onClick={backHandel}><DEL_CLIENT className={cls.icon}/> {t('Удалить клиента')}</AppButton>
                            </Box>
                            <ClientCard id={id} />
                        </div>
                        <div className={cls.big_column}></div>
                    </div>
                </div>
            </DynamicModuleLoader>
        
        )
    }

    return  <div>{t('Something went wrong')}</div>
})

export default ClientDetailPage