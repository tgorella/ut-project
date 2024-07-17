import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProductDetailsPageSchema } from '../types/ProductDetailsPage'
import { getProductById, Product, ProductType } from  '@/entities/Product'

const initialState: ProductDetailsPageSchema = {
    isLoading: true,
    error: undefined,
    data: undefined,
    form: undefined
}

const newProduct: Product = {
    _id: '',
    name: '',
    price: 0,
    discount: 0,
    count: 0,
    productType: ProductType.PRODUCT,
    description: '',
    img: [],
    category: '',
    subcategory: '',
    userId: ''
} 

export const productDetailsPageSlice = createSlice({
    name: 'productDetailsPage',
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.form = {...state.form, ...action.payload}
        },
        cancelEdit: (state) => {
            state.form = state.data
        },
        newProduct: (state) => {
            state.form = newProduct
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getProductById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload
                state.form = action.payload
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    }
})

export const {actions: productDetailsPageAction} = productDetailsPageSlice
export const {reducer: productDetailsPageReducer} =productDetailsPageSlice