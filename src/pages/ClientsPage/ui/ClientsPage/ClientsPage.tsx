
import { ClientsList, getClientsData, getClientsError, getClientsIsLoading } from 'entities/Clients'
import { fetchClients } from 'entities/Clients/model/services/fetchAll/fetchClients'
import { clientsReducer } from 'entities/Clients/model/slice/ClientsSlice'
import { getUserAuthData } from 'entities/User'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Text } from 'shared/ui/Text'
import { TextAlign } from 'shared/ui/Text/ui/Text'
import { PageLoader } from 'widgets/PageLoader'

const reducers = {
    clients: clientsReducer
}

const ClientsPage = memo(() => {
    const {t} = useTranslation('clients')
    const dispatch = useAppDispatch()
    const userData = useSelector(getUserAuthData)
    const clients = useSelector(getClientsData)
    const isLoading = useSelector(getClientsIsLoading)
    const error = useSelector(getClientsError)
    
    useEffect(() => {
        if(__PROJECT__ !== 'storybook') {
            if (userData) {
                dispatch(fetchClients(userData?.id))
            }
        }
    }, [dispatch, userData, userData?.id])

    if (isLoading) {
        return <PageLoader />
    }
    if (error) {
        return <Text text={t('Что-то пошло не так')} align={TextAlign.CENTER} />
    }
    
    return (
        <DynamicModuleLoader reducers={reducers}>
            <h1>
                {t('Клиенты')}
            </h1>
            {clients && clients?.length !== 0 ?
                (<div>
                    <ClientsList clients={clients} />
                </div>)
                : (<Text text={t('Клиенты не найдены')}  align={TextAlign.CENTER}/>)
            }
            
        </DynamicModuleLoader>
        
    )
})
 
export default ClientsPage