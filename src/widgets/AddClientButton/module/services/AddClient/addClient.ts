import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Client } from 'entities/Clients'
import { getUserAuthData } from 'entities/User'
import { addClientButtonAction } from '../../slice/AddClientButtonSlice'
import { getNewClientData } from 'features/AddClient/model/selectors/getNewClientData/getNewClientData'


export const addClient = createAsyncThunk<Client, void,ThunkConfig<string>>(
    'clientAddButton/addClient',
    async (_, thunkAPI) => {
        const {rejectWithValue, extra, dispatch, getState} = thunkAPI
        const authData = getUserAuthData(getState())
        const newClient = getNewClientData(getState())
        
        if (!authData || !newClient) {
            return rejectWithValue(i18n.t('no data'))
        }

        try {
            const {data} = await extra.api.post<Client>('/clients', {
                ...newClient,
                userId: authData.id ,
                id: Date.now().toString(),
                createdAt: Date.now().toString()
            })

            if (!data) {
                throw new Error('err')
            }
            setTimeout(() => {
                dispatch(addClientButtonAction.reset())
            }, 3000)
            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Неправильные логин или пароль'))
        }
    }
)
