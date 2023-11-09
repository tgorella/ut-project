import { StateSchema } from 'app/providers/StoreProvider'
import { getClientsTotal } from './getClientsTotal'

describe('getClientsTotal.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            clients: {
                total: '5'
            }
        }
        expect(getClientsTotal(state as StateSchema)).toEqual('5')
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientsTotal(state as StateSchema)).toEqual(undefined)
    })
})