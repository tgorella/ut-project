import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { getUserAuthData } from 'entities/User'
import { AppModules } from '../../types/AppModules'
import httpService from 'shared/api/api'

export const fetchUserModules = createAsyncThunk<AppModules, void,ThunkConfig<string>>(
    'appModules',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        try {
            const authData = getUserAuthData(getState())
            
            const {data} = await httpService.get<AppModules[]>('/appmodules/')

            if (!data) {
                const newData: AppModules = {
                    _id: Date.now.toString(),
                    userId: authData?._id,
                    calendar: true,
                    clients: true,
                    orders: true,
                    workFlow: true
                }
                const response = await httpService.post<AppModules>('/appmodules', newData)
                return response.data
            }

            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так'))
        }
    }
)