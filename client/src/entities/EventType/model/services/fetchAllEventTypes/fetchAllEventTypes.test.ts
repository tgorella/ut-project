import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchEventTypes } from './fetchAllEventTypes'

describe('fetchAllEventTypes.test', () => {
    test('success', async () => {

        const data={data: {
            eventTypes: [
                {
                    _id: '643e58efaba80539138865d2',
                    name: 'Работа',
                    color: '#ff759f',
                    isDefault: false
                }
            ]
        }}

        const thunk = new TestAsyncThunk(fetchEventTypes)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.eventTypes)
    })
    test('error fetch', async () => {

        const thunk = new TestAsyncThunk(fetchEventTypes)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})