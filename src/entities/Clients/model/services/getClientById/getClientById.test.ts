import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getClientById } from './getClientById'

describe('getClientById.test', () => {

    test('success', async() => {
        const data = {
            id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        }


        const thunk = new TestAsyncThunk(getClientById)
        thunk.api.get.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('643c5fe7013e22868a6eb63c')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)

    })
    test('error fetch', async() => {
        
        const thunk = new TestAsyncThunk(getClientById)
        thunk.api.get.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk('000')
        
        expect(result.meta.requestStatus).toBe('rejected')
    })
})