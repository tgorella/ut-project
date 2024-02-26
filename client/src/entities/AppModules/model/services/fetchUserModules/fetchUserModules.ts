import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { AppModules } from '../../types/AppModules'

export const fetchUserModules = createAsyncThunk<AppModules, void,ThunkConfig<string>>(
    'appModules',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        try {
            const authData = getUserAuthData(getState())
            
            const {data} = await extra.api.post('/', {
              
                'query': 'query Query { modules { _id calendar clients orders projects userId workflow } }',
                'operationName': 'Query'
            
            })

            if (!data) {
                const newData: Partial<AppModules> = {
                    userId: authData?._id,
                    calendar: true,
                    clients: true,
                    orders: true,
                    projects: true
                }
                const response = await extra.api.post<AppModules>('/appmodules', newData)
                return response.data
            }

            return data.data.modules
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так'))
        }
    }
)