import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addEventType } from './addEventType'

describe('addEventType', () => {
    test('success', async () => {
        const eventType = {
            _id: '5464gb45g4idx3',
            color: 'orange',
            isDefault: false,
            name: 'Test'
        }

        const thunk = new TestAsyncThunk(addEventType, {
            eventTypesEditSchema: {
                newData: eventType
            }
        })

        thunk.api.post.mockReturnValue(Promise.resolve({data: {data: {addEventType: eventType}}}))
        const result = await thunk.callThunk(eventType)

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(eventType)
    })

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(addEventType)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})