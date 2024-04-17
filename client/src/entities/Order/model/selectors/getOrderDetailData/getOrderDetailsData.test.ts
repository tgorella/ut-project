import { StateSchema } from 'app/providers/StoreProvider'
import { getOrderDetailsData } from './getOrderDetailsData'

const data = {
    title: 'test order'

}
describe('getOrderDetailData.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                data: data
            }
        }
        expect(getOrderDetailsData(state as StateSchema)).toEqual(data)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderDetailsData(state as StateSchema)).toEqual(undefined)
    })
})