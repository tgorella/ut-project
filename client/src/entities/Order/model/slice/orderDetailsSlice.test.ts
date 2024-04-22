import { OrderDetailsSchema } from '../types/OrderDetailsSchema'
import { orderDetailsReducer, orderDetailsAction } from './OrderDetailsSlice'
describe('orderDetailsSlice.test', () => {
    test('update order details', () => {
        const state: DeepPartial<OrderDetailsSchema> = {
            form: {
                title: 'test'
            }
        }
    
        expect(orderDetailsReducer(state as OrderDetailsSchema, orderDetailsAction.updateOrder({title: 'new title'}))).toEqual({
            form: {
                title: 'new title'
            }
        })
    })
    test('cancel edit', () => {
        const state: DeepPartial<OrderDetailsSchema> = {
            form: {
                title: 'Changed title'
            },
            data: {
                title: 'Prev title'
            }
        }
        expect(orderDetailsReducer(state as OrderDetailsSchema, orderDetailsAction.cancelEdit())).toEqual({
            form: {
                title: 'Prev title'
            },
            data: {
                title: 'Prev title'
            }

        })
    })
    test('new order', () => {
        const state: DeepPartial<OrderDetailsSchema> = {
            form: {}
        }

        expect(orderDetailsReducer(state as OrderDetailsSchema, orderDetailsAction.newOrder())).toEqual({
            form: {
                _id: '',
                clientId: {
                    _id: '',

                },
                total: '',
                notes: '',
                eventDate: '',
                eventType: '',
                orderNumber: '',
                place: '',
                status: {
                    _id:'',
                    name: '',
                    color: ''},
                startTime: '',
                endTime: '',
                title: '',
                userId: '',
                projectType: {
                    _id:'',
                    name: '',
                    userId: '',
                    stages: []}
            }
        })
    })
    
})