
import { ClientsList, getClientsBySearch, getClientsData, getClientsError, getClientsIsLoading } from 'entities/Clients'
import { fetchClients } from 'entities/Clients/model/services/fetchAll/fetchClients'
import { clientsReducer } from 'entities/Clients/model/slice/ClientsSlice'
import { getUserAuthData } from 'entities/User'
import { memo, useCallback, useEffect, useState } from 'react'
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
import { ToggleButtonValue, ToggleButtons } from 'shared/ui/ToggleButtons'
import { Searchbar } from 'widgets/Searchbar'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import ADD_CLIENT from 'shared/assets/img/add-client.svg'

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
    const [limit, setLimit] = useState(Number(localStorage.getItem('clients_limits')) || 25)

    const handlePageUp = useCallback((num: number) => setPage(num), [])
    const handlePageDown = useCallback((num: number) => setPage(num), [])
    const handleChangeLimit = useCallback((num: number | string) => {
        setLimit(Number(num))
        localStorage.setItem('clients_limits', String(num))
        setPage(1)
    }, [])

    const handleSearch = useCallback((val: string) => {
        dispatch(getClientsBySearch(val))
    }, [dispatch])

    const limitsValue: ToggleButtonValue[]  = [
        {title: '15', value: 15},
        {title: '25', value: 25},
        {title: '50', value: 50},
        {title: '100', value: 100},

    ]
    
    useEffect(() => {
        if(__PROJECT__ !== 'storybook') {
            if (userData) {
                dispatch(fetchClients(userData?.id))
            }
        }
    }, [dispatch, limit, page, userData, userData?.id])

    const filterClients = clients?.slice((page-1)*limit, page*limit)
   
    if (error) {
        return <Text text={t('Что-то пошло не так')} align={TextAlign.CENTER} />
    }
    
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <h1 className={cls.header}>
                {t('Клиенты')}
            </h1>
            <div className={cls.top_menu}>
                <AppButton size={ButtonSize.S} theme={ButtonTheme.SOLID}><ADD_CLIENT  className={cls.icon}/>{t('Добавить клиента')}</AppButton>
                <div className={cls.searchBlock}><Searchbar onChange={handleSearch} placeholder={t('Введите имя, фамилию или email')} /></div>
                <div className={cls.toggle_item}>
                    {t('Записей на странице:')} <ToggleButtons onChange={handleChangeLimit} currentValue={limit} values={limitsValue} />
                </div>
                
            </div>
            <Box className={cls.client_list}>
                {!isLoading ?
                    (<ClientsList clients={filterClients} />)
                    : ( <PageLoader />)}
            </Box>
            <Pagination 
                onPageDown={handlePageDown} 
                onPageUp={handlePageUp} 
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
