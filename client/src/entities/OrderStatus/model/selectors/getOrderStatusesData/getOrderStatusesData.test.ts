import { StateSchema } from 'app/providers/StoreProvider'
import { getOrderStatusesData } from './getOrderStatusesData'

describe('getOrderStatusesData.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderStatuses: {
                data: [{
                    _id:'6467834500aba6813881d4',
                    name:'Новый',
                    color:'',
                    isDefault:true
                }]
            }}
        expect(getOrderStatusesData(state as StateSchema)).toEqual(state.orderStatuses?.data)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderStatusesData(state as StateSchema)).toEqual(undefined)
    })
})