import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addEvent } from './addEvent'

describe('addEvent.test', () => {

    test('success', async () => {
        const event = {
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

        const thunk = new TestAsyncThunk(addEvent, {
            eventDetails: {
                formData: event
            }
        })

        thunk.api.post.mockReturnValue(Promise.resolve({data: {data: {addEvent: event}}}))
        const result = await thunk.callThunk()

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(event)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(addEvent)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
    })
})