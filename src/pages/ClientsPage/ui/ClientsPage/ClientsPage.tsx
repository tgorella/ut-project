
import { ClientsList, getClientsData, getClientsError, getClientsIsLoading, getClientsTotal } from 'entities/Clients'
import { fetchClients } from 'entities/Clients/model/services/fetchAll/fetchClients'
import { clientsReducer } from 'entities/Clients/model/slice/ClientsSlice'
import { getUserAuthData } from 'entities/User'
import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Box } from 'shared/ui/Box'
import { Pagination } from 'shared/ui/Pagination'
import { Text } from 'shared/ui/Text'
import { TextAlign } from 'shared/ui/Text/ui/Text'
import { PageLoader } from 'widgets/PageLoader'
import cls from './ClientsPage.module.scss'

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
    const [page, setPage] = useState(1)
    const [limit] = useState(25)
    const totalClients = useSelector(getClientsTotal)

    const handlePageUp = (num: number) => setPage(num)
    const handlePageDown = (num: number) => setPage(num)

    
    useEffect(() => {
        if(__PROJECT__ !== 'storybook') {
            if (userData) {
                dispatch(fetchClients({userId: userData?.id, page: String(page), limit: String(limit)}))
            }
        }
    }, [dispatch, limit, page, userData, userData?.id])

   
    if (error) {
        return <Text text={t('Что-то пошло не так')} align={TextAlign.CENTER} />
    }
    
    return (
        <DynamicModuleLoader reducers={reducers}>
            <h1 className={cls.header}>
                {t('Клиенты')}
            </h1>
            <Box className={cls.client_list}>
                {!isLoading ?
                    (<ClientsList clients={clients} />)
                    : ( <PageLoader />)}
            </Box>
            <Pagination 
                onPageDown={handlePageDown} 
                onPageUp={handlePageUp} 
                currentPage={page} 
                itemsPerPage={limit} 
                itemsLength={Number(totalClients)} 
                totalItems={!isLoading} 
                pages={!isLoading}
            />
            
        </DynamicModuleLoader>
        
    )
})
 
export default ClientsPage
