import { StateSchema } from 'app/providers/StoreProvider'
import { AppModules } from '../../types/AppModules'
import { getUserModulesData } from './getUserModulesData'

describe('getUserModulesData.test', () => {
    test('should return value', () => {
        const data: AppModules = {
            _id:'643c5fe7013e22868a6eb63c',
            userId: 'dlkjfglfdj980sdlksd',
            clients: true,
            orders: false,
            calendar: false,
            workFlow: true
        }
        const state : DeepPartial<StateSchema> = {
            userModules: {
                data: data
            }
        }
        expect(getUserModulesData(state as StateSchema)).toEqual(data)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getUserModulesData(state as StateSchema)).toEqual(undefined)
    })
})