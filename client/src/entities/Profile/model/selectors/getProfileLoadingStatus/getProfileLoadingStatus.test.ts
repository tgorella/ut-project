import { StateSchema } from '@/app/providers/StoreProvider'
import { getProfileLoadingStatus } from './getProfileLoadingStatus'

describe('getProfileLoadingStatus.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            profile: {
                isLoading: true
            }
        }
        expect(getProfileLoadingStatus(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getProfileLoadingStatus(state as StateSchema)).toEqual(undefined)
    })
})