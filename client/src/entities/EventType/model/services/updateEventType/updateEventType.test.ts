import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { updateEventType } from './updateEventType'

describe('updateEventType', () => {
    test('success', async () => {

        const data = {data: {
            updateEventType: {
                _id: '643c34fj3ytg43e22868a6eb63c',
                color: '#ff759f',
                name: 'Работа'
            }
        }}

        const thunk = new TestAsyncThunk(updateEventType)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({
            _id: '643c34fj3yt68a6eb63c',
            color: '#ff759f',
            name: 'Работа'
        })

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.updateEventType)
    })
    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(updateEventType)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({
            _id: '643c34fj3yt68a6eb63c',
            color: '#ff759f',
            name: 'Работа'
        })

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})