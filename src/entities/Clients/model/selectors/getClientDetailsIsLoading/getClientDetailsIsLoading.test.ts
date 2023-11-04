import { StateSchema } from 'app/providers/StoreProvider'
import { getClientDetailsIsLoading } from './getClientDetailsIsLoading'

describe('getClientDetailsError.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            clientDetails: {
                isLoading: true
            }
        }
        expect(getClientDetailsIsLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientDetailsIsLoading(state as StateSchema)).toEqual(undefined)
    })
})