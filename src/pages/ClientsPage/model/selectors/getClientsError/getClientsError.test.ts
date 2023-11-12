import { StateSchema } from 'app/providers/StoreProvider'
import { getClientsError } from './getClientsError'

describe('getClientsError.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            clientsPage: {
                error: 'error'
            }
        }
        expect(getClientsError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientsError(state as StateSchema)).toEqual(undefined)
    })
})