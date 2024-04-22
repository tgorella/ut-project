import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getEventById } from './getEventById'

describe('getEventById.test', () => {
    test('success', async () => {
        const data={ data : {
            event: {
                _id: 'sfe45h3435h34',
                title: 'Test event',
                userId: 's4hhlkkj8v389fb2nlt6',
                eventType: {
                    _id: '643e58efaba80539138865d2',
                    name: 'Работа',
                    color: '#ff759f',
                    isDefault: false
                },
                startTime: '',
                endTime: '',
                place: 'Paris',
                notes: 'Test event notes',
                eventDate: ''
            }
        }}

        const thunk = new TestAsyncThunk(getEventById)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk('sfe45h3435h34')

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.event)
    })

    test('error fetch', async () => {
        const thunk = new TestAsyncThunk(getEventById)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk('sfe45h3435h34')
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
      
    })

})