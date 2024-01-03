import { loginAction, loginReducer } from './loginSlice'
import { LoginSchema } from '../types/loginSchema'

describe('loginSlice.test', () => {
    test('test set username', () => {
      
        const state: DeepPartial<LoginSchema> = {username: 'Afonya'}
        expect(loginReducer(state as LoginSchema, loginAction.setUsername('User'))).toEqual({username:'User'})
    })
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {password: '1233'}
        expect(loginReducer(state as LoginSchema, loginAction.setPassword('Tratata'))).toEqual({password:'Tratata'})
    })
})