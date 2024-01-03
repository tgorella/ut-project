import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { updateProfileData } from './updateProfileData'

describe('updateProfileData.test', () => {

    test('success', async() => {
        const data = {
            firstname:'Name',
            lastname:'Surname',
            age:38,
            currency:Currency.RUB,
            country:Country.Russia,
            city:'NY',
            username:'lol',
            avatar:''
        }

        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data
            }
        })
        thunk.api.put.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)

    })
    test('error fetch', async() => {
        
        const thunk = new TestAsyncThunk(updateProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()
        
        expect(result.meta.requestStatus).toBe('rejected')
    })
})