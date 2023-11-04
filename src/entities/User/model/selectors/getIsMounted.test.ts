import { StateSchema } from 'app/providers/StoreProvider'
import { getIsMounted } from './getIsMounted'

describe('getIsMounted.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            user: {
                mounted: true
            }
        }
        expect(getIsMounted(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getIsMounted(state as StateSchema)).toEqual(undefined)
    })
})