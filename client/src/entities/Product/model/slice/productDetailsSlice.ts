import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Product, ProductDetailsSchema, ProductType } from '../types/Product'
import { updateProduct } from '../services/updateProduct/updateProduct'
import { getProductById } from '../services/getProductById/getProductById'

const initialState: ProductDetailsSchema = {
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
    userId: '',
    productCode: 'CA009'
} 

export const productDetailsSlice = createSlice({
    name: 'productDetails',
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
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.data = action.payload
                state.form = action.payload
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.payload
            })
    }
})

export const {actions: productDetailsAction} = productDetailsSlice
export const {reducer: productDetailsReducer} = productDetailsSlice