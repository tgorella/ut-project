import { useTranslation } from 'react-i18next'
import cls from './ClientDetailPage.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientCard, ClientOrdersList, getClientDetailsError, getClientDetailsIsLoading } from '@/entities/Clients'
import { memo } from 'react'
import { Box } from '@/shared/ui/Box'
import { AppButton, ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import BACK_ICON from '@/shared/assets/img/undo.svg'
import { useSelector } from 'react-redux'
import { AddOrderButton } from '@/widgets/AddOrderButton'
import { DelClientButton } from '@/widgets/DelClientButton'
import { HStack, VStack } from '@/shared/ui/Stack'

// interface ClientDetailPageProps {
// }
const ClientDetailPage = memo(() => {
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
            <VStack max gap='40' justify='center'>
                <h1>{t('Информация о клиенте')}</h1>
                <HStack gap='20' align='start'>
                    <VStack slim>
                        {!isLoading && 
                        <Box className={cls.button_wrapper}>
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
                    </VStack>
                    <VStack wide>
                        <ClientOrdersList clientId={id} />
                    </VStack>
                </HStack>
            </VStack>
        )
    }

    return  <div>{t('Something went wrong')}</div>
})

export default ClientDetailPage