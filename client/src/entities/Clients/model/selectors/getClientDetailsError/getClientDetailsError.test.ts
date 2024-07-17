import { StateSchema } from '@/app/providers/StoreProvider'
import { getClientDetailsError } from './getClientDetailsError'

describe('getClientDetailsError.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            clientDetails: {
                error: 'error'
            }
        }
        expect(getClientDetailsError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientDetailsError(state as StateSchema)).toEqual(undefined)
    })
})