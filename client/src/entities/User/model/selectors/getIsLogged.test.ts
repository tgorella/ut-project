import { StateSchema } from 'app/providers/StoreProvider'
import { getIsLogged } from './getIsLogged'

describe('getIsLogged.test', () => {
    test('should return value', () => {
       
        const state : DeepPartial<StateSchema> = {
            user: {
                isLogged: true
            }
        }
        expect(getIsLogged(state as StateSchema)).toEqual(true)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getIsLogged(state as StateSchema)).toEqual(undefined)
    })
})