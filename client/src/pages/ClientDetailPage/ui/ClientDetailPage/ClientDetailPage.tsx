import { useTranslation } from 'react-i18next'
import cls from './ClientDetailPage.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientCard, ClientOrdersList, getClientDetailsError, getClientDetailsIsLoading } from 'entities/Clients'
import { memo } from 'react'
import { Box } from 'shared/ui/Box'
import { AppButton, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import BACK_ICON from 'shared/assets/img/undo.svg'
import { useSelector } from 'react-redux'
import { AddOrderButton } from 'widgets/AddOrderButton'
import { DelClientButton } from 'widgets/DelClientButton'

interface ClientDetailPageProps {
  className?: string;
}
const ClientDetailPage = memo(({className} : ClientDetailPageProps) => {
    const {t} = useTranslation()
    let id: string | undefined
    const params = useParams()

    if (__PROJECT__ !== 'storybook') {
        id = params.id
    } else {
        id = '643c5fe7013e22868a6eb63c'
    }
    
    const history = useNavigate()
    const error = useSelector(getClientDetailsError)
    const isLoading = useSelector(getClientDetailsIsLoading)

    const backHandel = () => history(-1)
  
    
    if (id) {
        return ( 
            <div className={cls.page_wrapper}>
                <h1 className={cls.title}>{t('Информация о клиенте')}</h1>
                <div className={classNames(cls.ClientDetailPage, {}, [className])}>
                    <div className={cls.small_column} >
                        {!isLoading && <Box className={cls.button_wrapper}>
                            <AppButton theme={ButtonTheme.SOLID} onClick={backHandel}><BACK_ICON className={cls.icon}/> {t('Назад')}</AppButton>
                            {!error && 
                            <AddOrderButton 
                                withClient={false} 
                                buttonTheme={ButtonTheme.OUTLINED_GRAY} />}
                           
                            {!error && 
                            <DelClientButton 
                                clientId={id} 
                                buttonTheme={ButtonTheme.OUTLINED_GRAY}
                                buttonText={t('Удалить клиента')}
                                warningText={t('Внимание! Это действие нельзя будет отменить! Вы точно хотите удалить этого клиента?')}/>
                            }
                        </Box>}
                        <ClientCard id={id} />
                    </div>
                    <div className={cls.big_column}>
                        <ClientOrdersList clientId={id} />
                    </div>
                  
                </div>
            </div>
        
        )
    }

    return  <div>{t('Something went wrong')}</div>
})

export default ClientDetailPage