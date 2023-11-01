import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ProfileSchema } from '../types/profileSchema'
import { profileAction, profileReducer } from './profileSlice'

const data = {
    firstname:'Name',
    lastname:'Lastname',
    age:24,
    currency:Currency.RUB,
    country:Country.Russia,
    city:'City',
    username:'tratata',
    avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
}

describe('profileSlice.test', () => {
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = {readonly: true}
        expect(profileReducer(state as ProfileSchema, profileAction.setReadOnly(false))).toEqual({readonly: false})
    })
    test('test chancel edit', () => {
        const state: DeepPartial<ProfileSchema> = {data, form: {lastname: '', firstname: ''} }
        expect(profileReducer(state as ProfileSchema, profileAction.chancelEdit())).toEqual({
            readonly: true,
            data,
            form: data
        })
    })

    test('test update profile', () => {
        const state: DeepPartial<ProfileSchema> = {form: {username: 'test'}} 
        expect(profileReducer(state as ProfileSchema, profileAction.updateProfile({username: 'Login'}))).toEqual({
            form: {
                username:'Login',
            }
        })
    })

})