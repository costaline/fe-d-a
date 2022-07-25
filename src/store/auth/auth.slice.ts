import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { authInitialState } from '@@/store/auth/auth.initialState'
import { AuthState } from '@@/store/auth/auth.types'
import { persistUser } from './auth.helpers'

export const authSlice = createSlice({
	name: 'auth',
	initialState: authInitialState,
	reducers: {
		setCredentials(state, action: PayloadAction<AuthState>) {
			persistUser.save(action.payload)

			return action.payload
		},
		updateCredentials(state, action: PayloadAction<Partial<AuthState>>) {
			const updated = { ...state, ...action.payload }

			persistUser.save(updated)

			return updated
		},
		logout() {
			persistUser.remove()

			return authInitialState
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			(action) => {
				return action.type === '@@INIT'
			},
			(state) => {
				return persistUser.get<AuthState>() || state
			}
		)
	},
})

export const authActions = authSlice.actions
