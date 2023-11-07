import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchProfileData } from './fetchProfileData'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

describe('fetchProfileData.test', () => {

    test('success', async() => {
        const data = {
            firstname:'Tatiana',
            lastname:'Gorelova',
            age:38,
            currency:Currency.RUB,
            country:Country.Russia,
            city:'Zvenigorod',
            username:'tratata',
            avatar:'https://avatars.githubusercontent.com/u/107557323?v=4'
        }


        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('tratata')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)

    })
    test('error fetch', async() => {
        
        const thunk = new TestAsyncThunk(fetchProfileData)
        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('tratata')
        
        expect(result.meta.requestStatus).toBe('rejected')
    })
})