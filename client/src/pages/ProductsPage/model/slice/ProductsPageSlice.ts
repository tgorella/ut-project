import {PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts, Product } from 'entities/Product'
import { ProductsPageSchema } from '../types/ProductsPage'

const initialState: ProductsPageSchema = {
    isLoading: false,
    data: undefined,
    error: undefined,
    limit: 25,
    search: ''
    
}

export const productsPageSlice = createSlice({
    name: 'productsPage',
    initialState,
    reducers: {
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload
            localStorage.setItem('products_limit', action.payload.toString())
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        initState: (state) => {
            state.limit = Number(localStorage.getItem('products_limit')) || 25
        },
        productDeleted: (state, action) => {
            state.data = state.data?.filter((item: Product) => item._id !== action.payload)
        },
        productAdded: (state, action) => {
            state.data?.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.isLoading = false
                state.error = undefined
                state.data = action.payload

            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.isLoading= false
                state.error = action.payload
            })
    }
})

export const {actions: productsPageAction} = productsPageSlice
export const {reducer: productsPageReducer} =productsPageSlice