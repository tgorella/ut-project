import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { AppModules } from '../../types/AppModules'
import { getUserModulesData } from '../../selectors/getUserModulesData/getUserModulesData'
import httpService from 'shared/api/api'

export const updateModules = createAsyncThunk<AppModules, string,ThunkConfig<string>>(
    'appModules',
    // @ts-ignore
    async (moduleId, thunkAPI) => {
        const {rejectWithValue, getState} = thunkAPI
        try {
            const moduleData = getUserModulesData(getState())
            
            const {data} = await httpService.patch<AppModules>(`/appmodules/${moduleId}`, moduleData)

            if (!data) {
                throw new Error('err')
            }

            return data
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так'))
        }
    }
)