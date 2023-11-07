import { getClientsData } from 'entities/Clients/model/selectors/getClientsData/getClientsData'
import { fetchClients } from 'entities/Clients/model/services/fetchAll/fetchClients'
import { clientsReducer } from 'entities/Clients/model/slice/ClientsSlice'
import { getUserAuthData } from 'entities/User'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { AppLink } from 'shared/ui/AppLink/AppLink'

const reducers = {
    clients: clientsReducer
}

const ClientsPage = memo(() => {
    const {t} = useTranslation('clients')
    const dispatch = useAppDispatch()
    const userData = useSelector(getUserAuthData)
    const clients = useSelector(getClientsData)
    
    useEffect(() => {
        if (userData) {
            dispatch(fetchClients(userData?.id))
        }
    }, [dispatch, userData, userData?.id])
    return (
        <DynamicModuleLoader reducers={reducers}>
            <h1>
                {t('Клиенты')}
            </h1>
            <div>
                {clients?.map((client) => {
                    return <p key={client.id}><AppLink to={`/clients/${client.id}`}>{client.name}</AppLink></p>
                })}
            </div>
        </DynamicModuleLoader>
        
    )
})
 
export default ClientsPage