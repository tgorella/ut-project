
import { fetchClients } from '../../model/services/fetchAll/fetchClients'
import { getUserAuthData } from 'entities/User'
import { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Box } from 'shared/ui/Box'
import { Pagination } from 'shared/ui/Pagination'
import { Text } from 'shared/ui/Text'
import { TextAlign } from 'shared/ui/Text/ui/Text'
import { PageLoader } from 'widgets/PageLoader'
import cls from './ClientsPage.module.scss'
import { ToggleButtonValue, ToggleButtons } from 'shared/ui/ToggleButtons'
import { Searchbar } from 'widgets/Searchbar'
import { ClientsPageActions, ClientsPageReducer, getClients } from '../../model/slice/clientsPageSlice'
import { getClientPageLimit } from '../../model/selectors/getClientPageLimit/getClientPageLimit'
import { getClientsError } from '../../model/selectors/getClientsError/getClientsError'
import { getClientsIsLoading } from '../../model/selectors/getClientsIsLoading/getClientsIsLoading'
import { getClientsBySearch } from '../../model/services/getClientsBySearch/getClientsBySearch'
import { ClientsList } from '../../../../entities/Clients/ui/ClientsList/ClientsList'
import { getClientPageInited } from '../../model/selectors/getClientsPageInited/getClientsPageInited'
import { HStack } from 'shared/ui/HStack/HStack'
import { AddClientButton } from 'widgets/AddClientButton/ui/AddClientButton'

const reducers: ReducersList = {
    clientsPage: ClientsPageReducer
}

const ClientsPage = memo(() => {
    const {t} = useTranslation('clients')
    const dispatch = useAppDispatch()
    const userData = useSelector(getUserAuthData)
    const clients = useSelector(getClients.selectAll)
    const isLoading = useSelector(getClientsIsLoading)
    const error = useSelector(getClientsError)
    const [page, setPage] = useState(1)
    const limit = useSelector(getClientPageLimit) || 25
    const inited = useSelector(getClientPageInited)

    const handlePageChange = useCallback((num: number) => setPage(num), [])
    const handleChangeLimit = useCallback((num: number | string) => {
        dispatch(ClientsPageActions.setLimit(Number(num)))
    }, [dispatch])

    const handleSearch = useCallback((val: string) => {
        dispatch(getClientsBySearch(val))
    }, [dispatch])

    const limitsValue: ToggleButtonValue[]  = [
        {title: '15', value: 15},
        {title: '25', value: 25},
        {title: '50', value: 50},
        {title: '100', value: 100}
    ]

    useEffect(() => {
        if(__PROJECT__ !== 'storybook') {
            if (userData) {
                if(!inited) {
                    dispatch(ClientsPageActions.initState())
                    dispatch(fetchClients())
                }
            }
        }
    }, [dispatch, inited, limit, page, userData, userData?.id])

    const filterClients = clients?.slice((page-1)*limit, page*limit)
   
    if (error) {
        return <Text text={t('Что-то пошло не так')} align={TextAlign.CENTER} />
    }
    
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <h1 className={cls.header}>
                {t('Клиенты')}
            </h1>
            <HStack className={cls.top_menu}>
                <AddClientButton />
                <div className={cls.searchBlock}>
                    <Searchbar onChange={handleSearch} placeholder={t('Введите имя, фамилию, email или номер телефона')} />
                </div>
                <div className={cls.toggle_item}>
                    {t('Записей на странице:')} <ToggleButtons onChange={handleChangeLimit} currentValue={limit} values={limitsValue} />
                </div>
            </HStack>
            <Box className={cls.client_list}>
                {!isLoading ?
                    (<ClientsList clients={filterClients} />)
                    : ( <PageLoader />)}
            </Box>
            <Pagination 
                onPageChange={handlePageChange} 
                currentPage={page} 
                itemsPerPage={limit} 
                itemsLength={clients?.length || 0} 
                totalItems={!isLoading} 
                pages={!isLoading}
            />
        </DynamicModuleLoader>
        
    )
})
 
export default ClientsPage
