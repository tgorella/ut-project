import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { getProductsByCategory } from './getProductsByCategory'

describe('productByCategory.test', () => {
    test('success', async () => {
        const data = {data : {
            productsByCategory: [
                {
                    _id: '1',
                    name: 'Product 1',
                    category: 'Category 1'
                },
                {
                    _id: '674',
                    name: 'Product 674',
                    category: 'Category 1'
                },
                {
                    _id: '679671',
                    name: 'Product 5698',
                    category: 'Category 1'
                }
            ]
        }}

        const thunk = new TestAsyncThunk(getProductsByCategory)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({category: 'Category 1', resParams: '_id name category'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.productsByCategory)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(getProductsByCategory)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({category: 'Category 1', resParams: '_id name category'})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})