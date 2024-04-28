import { StateSchema } from '@/app/providers/StoreProvider'
import { getEventData } from './getEventData'

describe('deleteClient.test', () => {
    test('should return data', () => {
        const data = {
            _id: 'gf3h5jft8y5673dfg423g',
            title: 'Test event',
            userId: 'sd3x6fgs5edf2354iuy2367',
            eventType: {
                _id: '643e58efaba80539138865d2',
                name: 'Личное',
                color: '#ff759f',
                isDefault: false
            },
            startTime: '',
            endTime: '',
            place: '',
            notes: '',
            eventDate: ''
        }

        const state: DeepPartial<StateSchema> = {
            eventDetails: {
                eventDetails: data
            }
        }
        expect(getEventData(state as StateSchema)).toEqual(data)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getEventData(state as StateSchema)).toEqual(undefined)
    })
})