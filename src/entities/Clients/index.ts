import { Client } from './model/types/clientsSchema'
import { ClientCard } from './ui/ClientCard/ClientCard'
import { getClientById } from './model/services/getClientById/getClientById'
import type { ClientDetailsSchema } from './model/types/clientDetailsSchema'
import type { ClientsSchema } from './model/types/clientsSchema'
import { getClientDetailsData } from './model/selectors/getClientDetailsData/getClientDetailsData'
import { getClientDetailsError } from './model/selectors/getClientDetailsError/getClientDetailsError'
import { getClientDetailsForm } from './model/selectors/getClientDetailsForm/getClientDetailsForm'
import { getClientDetailsIsLoading } from './model/selectors/getClientDetailsIsLoading/getClientDetailsIsLoading'
import { updateClientData } from './model/services/updateClientData/updateClientData'
import { clientDetailsAction, clientDetailsReducer } from './model/slice/clientDetailsSlice'
import { getClientsIsLoading } from './model/selectors/getClientsIsLoading/getClientsIsLoading'
import { getClientsData } from './model/selectors/getClientsData/getClientsData'
import { getClientsError } from './model/selectors/getClientsError/getClientsError'
import { ClientsList } from './ui/ClientsList/ClientsList'
import { getClientsTotal } from './model/selectors/getClientsTotal/getClientsTotal'
import { getClientsBySearch } from './model/services/getClientsBySearch/getClientsBySearch'


export {
    Client,
    ClientsSchema,
    ClientDetailsSchema,
    getClientById,
    updateClientData,
    ClientCard,
    clientDetailsAction,
    ClientsList,
    getClientsBySearch,
    getClientsTotal,
    getClientDetailsData,
    getClientDetailsError,
    getClientDetailsForm,
    getClientDetailsIsLoading,
    getClientsIsLoading, 
    getClientsData, 
    getClientsError,
    clientDetailsReducer,
}