import { StateSchema } from '@/app/providers/StoreProvider'
import { getLoginPassword } from './getLoginPassword'

describe('getLoginPassword.test', () => {
    test('with default state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getLoginPassword(state as StateSchema)).toEqual('')
    })
    test('should return value', () => {
        const state : DeepPartial<StateSchema> = {
            loginForm: {
                password: 'password'
            }
        }
        expect(getLoginPassword(state as StateSchema)).toEqual('password')
    })
})