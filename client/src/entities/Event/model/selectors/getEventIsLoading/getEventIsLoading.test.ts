import { StateSchema } from '@/app/providers/StoreProvider'
import { getEventIsLoading } from './getEventIsLoading'

describe('getEventIsLoading.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateSchema> = {
            eventDetails: {
                isLoading: true
            }
        }
        expect(getEventIsLoading(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getEventIsLoading(state as StateSchema)).toEqual(undefined)
    })
})