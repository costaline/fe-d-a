import { combineReducers } from '@reduxjs/toolkit'

import { aboutApi } from '@@/store/about/about.api'
import { articlesApi } from '@@/store/articles/articles.api'
import { authSlice } from '@@/store/auth/auth.slice'
import { cartSlice } from '@@/store/cart/cart.slice'
import { productsApi } from '@@/store/products/products.api'
import { uiSlice } from '@@/store/ui/ui.slice'

const combinedReducer = combineReducers({
	/* api */
	[productsApi.reducerPath]: productsApi.reducer,
	[aboutApi.reducerPath]: aboutApi.reducer,
	[articlesApi.reducerPath]: articlesApi.reducer,
	/* slices */
	[authSlice.name]: authSlice.reducer,
	[uiSlice.name]: uiSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
})

export const RESET_STATE = '!!!RESET_STATE!!!'

export const resetStateAction = () => ({
	type: RESET_STATE,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const rootReducer = (state, action) => {
	if (action.type === RESET_STATE) {
		// eslint-disable-next-line no-param-reassign
		state = undefined
	}

	return combinedReducer(state, action)
}
