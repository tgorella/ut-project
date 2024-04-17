import { EventSchema } from '../types/Event'
import { eventAction, eventReducer } from './EventSlice'


describe('eventSlice.test', () => {
    test('updateEvent', () => {
        const state: DeepPartial<EventSchema> = {
            formData: {
                title: ''
            }
        }
        expect(eventReducer(
          state as EventSchema, 
          eventAction.updateEvent({title: 'test'}))).toEqual({
            formData: { title: 'test'}
        })
    })
    test('chancel edit', () => {
        const state: DeepPartial<EventSchema> = {
            formData: {
                title: 'Test'
            },
            eventDetails: {
                title: ''
            }
        }
        expect(eventReducer(
  state as EventSchema,
  eventAction.chancelEdit()
        )).toEqual({
            formData: {
                title: ''
            },
            eventDetails: {
                title: ''
            }
        })
    })
    test('newEvent', () => {
        const state: DeepPartial<EventSchema> = {
            formData: {}
        }
        expect(eventReducer(
          state as EventSchema,
          eventAction.newEvent()
        )).toEqual({
            formData: {
                _id: '',
                title: '',
                userId: '',
                eventType: {
                    _id: '',
                    name: '',
                    color: '',
                    isDefault: false
                },
                startTime: '',
                endTime: '',
                place: '',
                notes: '',
                eventDate: ''
            }
        })
    })
})