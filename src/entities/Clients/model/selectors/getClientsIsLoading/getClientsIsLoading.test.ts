import { StateSchema } from 'app/providers/StoreProvider'
import { getClientsIsLoading } from './getClientsIsLoading'

describe('getClientsIsLoading.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            clients: {
                isLoading: true
            }
        }
        expect(getClientsIsLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientsIsLoading(state as StateSchema)).toEqual(undefined)
    })
})