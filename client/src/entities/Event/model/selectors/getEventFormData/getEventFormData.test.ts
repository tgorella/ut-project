import { StateSchema } from 'app/providers/StoreProvider'
import { getEventFormData } from './getEventFormData'

describe('getEventFormData.test', () => {
    test('should return value', () => {
        const data = {
            title: 'test',
            eventType: {
                _id: '643e58efaba80539138865d2',
                name: 'Личное',
                color: '#ff759f',
                isDefault: false
            },
            startTime: '',
            endTime: '',
            place: 'Paris',
            notes: 'Test notes',
            eventDate: ''
        }
        const state: DeepPartial<StateSchema> = {
            eventDetails: {
                formData: data
            }
        }
        expect(getEventFormData(state as StateSchema)).toEqual(data)
    })
    test('with empty state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getEventFormData(state as StateSchema)).toEqual(undefined)
    })
})