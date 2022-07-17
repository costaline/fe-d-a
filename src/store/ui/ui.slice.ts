import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { uiInitialState } from './ui.initialState'
import { Theme } from './ui.types'

export const uiSlice = createSlice({
	name: 'ui',
	initialState: uiInitialState,
	reducers: {
		setTheme: (draft, action: PayloadAction<{ theme: Theme }>) => {
			draft.theme = action.payload.theme
		},
	},
})

export const uiActions = uiSlice.actions
