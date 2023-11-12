import {
    PayloadAction,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Client } from 'entities/Clients'
import { ClientsPageSchema } from '../types/clientsPageSchema'
import { fetchClients } from 'pages/ClientsPage/model/services/fetchAll/fetchClients'
import { getClientsBySearch } from '../services/getClientsBySearch/getClientsBySearch'
import { addClient } from '../services/AddClient/addClient'


const clientsPageAdapter = createEntityAdapter<Client>({
    // Assume IDs are stored in a field other than `book.id`
    // @ts-ignore
    selectId: (client) => client.id,
})

export const getClients = clientsPageAdapter.getSelectors<StateSchema>((state) => state.clientsPage || clientsPageAdapter.getInitialState())

const clientsPageSlice = createSlice({
    name: 'clientsPageSlice',
    initialState: clientsPageAdapter.getInitialState<ClientsPageSchema>({
        isLoading: false,
        ids: [],
        entities: {},
        limit: 25,
        _inited: false,
        clientAdded: false,
        clientAddError: undefined
    }),
    reducers: {
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
            localStorage.setItem('clients_limits', action.payload.toString())
        },
        initState: (state) => {
            state.limit = Number(localStorage.getItem('clients_limits')) || 25
            state._inited = true
        },
        resetAdded: (state) => {
            state.clientAdded = false
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
                state.isLoading = false
                state.error = undefined
                state._inited = true
                clientsPageAdapter.setAll(state, action.payload)


            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(getClientsBySearch.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getClientsBySearch.fulfilled, (state, action: PayloadAction<Client[]>) => {
                state.isLoading = false
                state.error = undefined
                clientsPageAdapter.setAll(state, action.payload)
            })
            .addCase(getClientsBySearch.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
            .addCase(addClient.pending, (state) => {
                state.clientAdded = false
                state.clientAddError = undefined
            })
            .addCase(addClient.fulfilled, (state, action) => {
                state.clientAdded = true
                clientsPageAdapter.addOne(state,action.payload)
            })
            .addCase(addClient.rejected, (state, action) => {
                state.clientAddError = action.payload
            })
          
    }
})

export const {
    reducer: ClientsPageReducer,
    actions: ClientsPageActions} = clientsPageSlice

// clientsPageAdapter.addOne(state,action.payload)