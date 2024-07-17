import { StateSchema } from '@/app/providers/StoreProvider'
import { getClientOrdersData } from './getClientOrdersData'

describe('getClientOrdersData.test', () => {
    test('should return value', () => {
     
        const state : DeepPartial<StateSchema> = {
            clientDetails: {
                orders: []
            }
        }
        expect(getClientOrdersData(state as StateSchema)).toEqual([])
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientOrdersData(state as StateSchema)).toEqual(undefined)
    })
})