import { fetchClients } from 'entities/Clients/model/services/fetchAll/fetchClients'
import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

const ClientsPage = memo(() => {
    const {t} = useTranslation('clients')
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchClients())
    }, [dispatch])
    return (
        <div>
            <h1>
                {t('Клиенты')}
            </h1>
        </div>
        
    )
})
 
export default ClientsPage