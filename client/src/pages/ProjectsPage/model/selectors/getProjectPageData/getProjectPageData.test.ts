import { StateSchema } from '@/app/providers/StoreProvider'
import { Project } from '@/entities/Project'
import { getProjectPageData } from './getProjectPageData'

describe('getProjectPageData.test', () => {
    test('should return value', () => {
        const data : Project[] = [
            {
                _id: 'test',
                name: '',
                stages: [],
                userId: 'sdjhskdhfs'
            }
        ]
        const state : DeepPartial<StateSchema> = {
            projectPage: {
                data: data
            }
        }
        expect(getProjectPageData(state as StateSchema)).toEqual(data)
    })
    test('with empty state', () => {
        const state : DeepPartial<StateSchema> = {}
        expect(getProjectPageData(state as StateSchema)).toEqual(undefined)
    })
})