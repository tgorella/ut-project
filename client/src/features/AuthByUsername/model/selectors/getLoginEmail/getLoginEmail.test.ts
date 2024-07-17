import { StateSchema } from '@/app/providers/StoreProvider'
import { getLoginEmail } from './getLoginEmail'

describe('getLoginEmail.test', () => {
    test('should return value', () => {
        const state : DeepPartial<StateSchema> = {
            loginForm: {
                email: 'AbraCadabra@mail.ru'
            }
        }
        expect(getLoginEmail(state as StateSchema)).toEqual('AbraCadabra@mail.ru')
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getLoginEmail(state as StateSchema)).toEqual('')
    })
})