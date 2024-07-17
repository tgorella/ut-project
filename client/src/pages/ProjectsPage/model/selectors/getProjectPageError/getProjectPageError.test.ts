import { StateSchema } from '@/app/providers/StoreProvider'
import { getProjectPageError } from './getProjectPageError'

describe('getProjectPageError.test', () => {
    test('should return value', () => {
        const state : DeepPartial<StateSchema> = {
            projectPage: {
                error: 'Some error'
            }
        }
        expect(getProjectPageError(state as StateSchema)).toEqual('Some error')
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getProjectPageError(state as StateSchema)).toEqual(undefined)
    })
})