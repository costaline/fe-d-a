import { AuthState } from './auth.types'

export const authInitialState: AuthState = {
	user: null,
	token: null,
	refreshToken: null,
}
