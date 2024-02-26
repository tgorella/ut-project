import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { AppModules } from '../../types/AppModules'
import { getUserModulesData } from '../../selectors/getUserModulesData/getUserModulesData'

export const updateModules = createAsyncThunk<AppModules, void,ThunkConfig<string>>(
    'appModules',
    // @ts-ignore
    async (_, thunkAPI) => {
        const {rejectWithValue, getState, extra} = thunkAPI
        try {
            const moduleData = getUserModulesData(getState())
            
            const {data} = await extra.api.post('/', 
                {
                    'query': 'mutation Mutation($data: ModulesNewDataInput) { updateModules(data: $data) { calendar clients orders projects workflow } }',
                    'operationName': 'Mutation',
                    'variables': { 'data': moduleData}
                })

            if (!data) {
                throw new Error('err')
            }
            return data.data.updateModules
        } catch (error) {
            return rejectWithValue(i18n.t('Что-то пошло не так'))
        }
    }
)