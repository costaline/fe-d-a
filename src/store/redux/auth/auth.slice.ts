import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authInitialState } from '@@/store/redux/auth/auth.initialState'
import { AuthState } from '@@/store/redux/auth/auth.types'

export const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		setCredentials(state, action: PayloadAction<AuthState>) {
			return action.payload
		},

		updateCredentials(state, action: PayloadAction<Partial<AuthState>>) {
			return { ...state, ...action.payload }
		},

		logout() {
			return authInitialState
		},
	},
})

export const authActions = authSlice.actions
