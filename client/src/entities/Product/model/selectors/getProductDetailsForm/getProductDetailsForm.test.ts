import { StateSchema } from '@/app/providers/StoreProvider'
import { getProductDetailsForm } from './getProductDetailsForm'

describe('getProductDetailsForm.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            productDetails: {
                form: {
                    _id: '1',
                    name: 'test'
                }
            }
        }
        expect(getProductDetailsForm(state as StateSchema)).toEqual({
            _id: '1',
            name: 'test'
        })
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getProductDetailsForm(state as StateSchema)).toEqual(undefined)
    })
})