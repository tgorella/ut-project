import { StateSchema } from 'app/providers/StoreProvider'
import { getEventError } from './getEventError'

describe('getEventError.test', () => {
    test('should  return value', () => {
        const state: DeepPartial<StateSchema> = {
            eventDetails: {
                error: 'error'
            }
        }
        expect(getEventError(state as StateSchema)).toEqual('error')
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getEventError(state as StateSchema)).toEqual(undefined)
    })
})