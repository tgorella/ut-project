import { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileLoadingError } from './getProfileLoadingError'

describe('getProfileLoadingError.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            profile: {
                error: 'error'
            }
        }
        expect(getProfileLoadingError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getProfileLoadingError(state as StateSchema)).toEqual(undefined)
    })
})