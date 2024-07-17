import { StateSchema } from '@/app/providers/StoreProvider'
import { getProjectPageIsLoading } from './getProjectPageIsLoading'
describe('getProjectPageIsLoading.test', () => {
    test('schould return value', () => {
        const state : DeepPartial<StateSchema> = {
            projectPage: {
                isLoading: true
            }
        }
        expect(getProjectPageIsLoading(state as StateSchema)).toEqual(true)
    })
    test('empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getProjectPageIsLoading(state as StateSchema)).toEqual(undefined)
    })
})