import { ClientDetailsSchema } from '../types/clientDetailsSchema'
import { clientDetailsAction, clientDetailsReducer } from './clientDetailsSlice'

const data = {
    id:'643c5fe7013e22868a6eb63c',
    avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
    name: 'Джонни Депп',
    profession: 'актер',
    email: 'name@mydomain.com',
    phone: '89001234567',
    notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
}

describe('clientDetailsSlice.test', () => {
    test('test chancel edit', () => {
        const state: DeepPartial<ClientDetailsSchema> = {data, form: {name: '', profession: ''} }
        expect(clientDetailsReducer(state as ClientDetailsSchema, clientDetailsAction.cancelEdit())).toEqual({
            data,
            form: data
        })
    })

    test('test update client data', () => {
        const state: DeepPartial<ClientDetailsSchema> = {form: {name: 'test'}} 
        expect(clientDetailsReducer(state as ClientDetailsSchema, clientDetailsAction.updateClient({name: 'Login'}))).toEqual({
            form: {
                name:'Login',
            }
        })
    })

})