import { StateSchema } from '@/app/providers/StoreProvider'
import { getClientDetailsData } from './getClientDetailsData'

describe('getClientDetailData.test', () => {
    test('should return value', () => {
        const data = {
            id:'643c5fe7013e22868a6eb63c',
            avatarUrls: 'https://amur.info/wp-content/uploads/2023/07/3-16-768x518.jpg',
            name: 'Джонни Депп',
            profession: 'актер',
            email: 'name@mydomain.com',
            phone: '89001234567',
            notes: 'американский актёр, кинорежиссёр, музыкант, сценарист и продюсер.'
        }
        const state : DeepPartial<StateSchema> = {
            clientDetails: {
                data: data
            }
        }
        expect(getClientDetailsData(state as StateSchema)).toEqual(data)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getClientDetailsData(state as StateSchema)).toEqual(undefined)
    })
})