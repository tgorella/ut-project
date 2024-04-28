import { StateSchema } from '@/app/providers/StoreProvider'
import { getOrderStatusById } from './getOrderStatusById'

describe('getOrderStatusById.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderStatuses: {
                data: [{
                    _id:'6467834500aba6813881d4',
                    name:'Новый',
                    color:'',
                    isDefault:true
                }]
            }
        }
        expect(getOrderStatusById('6467834500aba6813881d4')(state as StateSchema)).toEqual({
            _id:'6467834500aba6813881d4',
            name:'Новый',
            color:'',
            isDefault:true
        })
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderStatusById('6467834500aba6813881d4')(state as StateSchema)).toEqual(undefined)
    })
})