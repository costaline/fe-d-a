import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IProduct } from '@@/store/products/products.types'

const initialState: IProduct[] = []

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<IProduct>) => {
			state.push(action.payload)
		},

		removeItem: (state, action: PayloadAction<{ id: number }>) => {
			return state.filter((p) => p.id !== action.payload.id)
		},
	},
})

export const cartActions = cartSlice.actions
