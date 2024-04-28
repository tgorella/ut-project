import { StateSchema } from '@/app/providers/StoreProvider'
import { getUserAuthData } from './getUserAuthData'

describe('getUserAuthData.test', () => {
    test('should return value', () => {
       
        const authData = {
            _id: '875373785',
            email: 'test'
        }
        const state : DeepPartial<StateSchema> = {
            user: {
                authData: authData
            }
        }
        expect(getUserAuthData(state as StateSchema)).toEqual(authData)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getUserAuthData(state as StateSchema)).toEqual(undefined)
    })
})