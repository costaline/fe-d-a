/* state */
export interface AuthState {
	user: null | string
	token: null | string
	refreshToken: null | string
}

/* success register response */
export interface RegisterBody {
	username: string
	email: string
	password: string
}

export interface User {
	id: number
	username: string
	email: string
	provider: string
	confirmed: boolean
	blocked: boolean
	createdAt: Date
	updatedAt: Date
}

export interface RegisterResponse {
	jwt: string
	user: User
}

/* success login response */
export interface LoginBody {
	identifier: string
	password: string
}

export type LoginResponse = RegisterResponse

// TODO: restore password
export type AuthResponse = RegisterResponse | LoginResponse
