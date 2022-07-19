import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authInitialState } from '@@/store/auth/auth.initialState'
import { AuthState } from '@@/store/auth/auth.types'

export const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		setCredentials(state, action: PayloadAction<AuthState>) {
			return action.payload
		},
		logout() {
			return authInitialState
		},
	},
})

export const authActions = authSlice.actions
