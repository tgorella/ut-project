import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addStep } from './addStep'

describe('addStep.test.test', () => {
    test('success', async () => {
        const data = {
            data: {
                addProjectStep: {
                    _id: '1',
                    name: 'Step',
                    stageId: '1',
                    index: '1',
                    projectId: '1'
                }
            }
        }

        const thunk = new TestAsyncThunk(addStep)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({name: 'Step', stageId: '1', projectId: '1'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.addProjectStep)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(addStep)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))
        const result = await thunk.callThunk({name: 'Step', stageId: '1', projectId: '1'})
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})