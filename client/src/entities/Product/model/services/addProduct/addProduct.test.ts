import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addProduct } from './addProduct'
import { ProductType } from '../../types/Product'

describe('addProduct.test', () => {
    test('success', async () => {
        const data = {data: {
            addProduct: {
                _id: '1',
                name: 'Product 1',
                price: 100,
                description: 'Some description',
                discount: 0,
                count: 150,
                productType: ProductType.PRODUCT,
                img: '',
                category: '',
                subcategory: '',
                userId: ''
            }
        }}

        const thunk = new TestAsyncThunk(addProduct)
        thunk.api.post.mockReturnValue(Promise.resolve({data}))

        const result = await thunk.callThunk({
            name: 'Product 1',
            price: 100,
            description: 'Some description',
            discount: 0,
            count: 150,
            productType: ProductType.PRODUCT,
            img: '',
            category: '',
            subcategory: '',
            userId: ''
        })

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data.data.addProduct)
    })
    test('fetch error', async () => {
        const thunk = new TestAsyncThunk(addProduct)
        thunk.api.post.mockReturnValue(Promise.resolve({status: 403}))

        const result = await thunk.callThunk({})

        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
    })
})