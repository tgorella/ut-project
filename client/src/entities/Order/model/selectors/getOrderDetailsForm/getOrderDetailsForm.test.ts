import { StateSchema } from 'app/providers/StoreProvider'
import { getOrderDetailsForm } from './getOrderDetailsForm'

describe('getOrderDetailsForm.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            orderDetails: {
                form: {
                    title: 'test'
                }
            }
        }
        expect(getOrderDetailsForm(state as StateSchema)).toEqual({title: 'test'})
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getOrderDetailsForm(state as StateSchema)).toEqual(undefined)
    })
})