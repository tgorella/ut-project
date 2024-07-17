import { StateSchema } from '@/app/providers/StoreProvider'
import { getProductDetailsData } from './getProductDetailsData'

describe('getProductDetailsData.tets', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            productDetailsPage: {
                data: {
                    _id: '1',
                    name: 'test'
                }
            }
        }
        expect(getProductDetailsData(state as StateSchema)).toEqual({
            _id: '1',
            name: 'test'})
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getProductDetailsData(state as StateSchema)).toEqual(undefined)
    })
})