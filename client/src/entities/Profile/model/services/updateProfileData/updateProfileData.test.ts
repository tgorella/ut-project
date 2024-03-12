import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { updateProfileData } from './updateProfileData'

describe('updateProfileData.test', () => {

    test('success', async() => {
        const data = { data: { 
            updateUser: {
                avatar:'https://img.freepik.com/premium-photo/robot-with-cute-face_821898-1076.jpg',
                city:'Moscow',
                country:Country.Russia,
                currency:Currency.RUB,
                email:'tratata@mail.ru',
                firstname:'Robo',
                lastOrderNumber:'22',
                lastname:'Kit',
                username:'tratata'
            }}}

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data.data.updateUser
            }
        })
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateUser)

    })
    test('error fetch', async() => {
        
        const thunk = new TestAsyncThunk(updateProfileData)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()
        
        expect(result.meta.requestStatus).toBe('rejected')
    })
})