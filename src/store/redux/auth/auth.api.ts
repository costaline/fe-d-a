import { createApi } from '@reduxjs/toolkit/query/react'

import { baseRestPublicQuery } from '@@/init/redux/baseApi/baseRestQuery'
import {
	LoginBody,
	LoginResponse,
	RegisterBody,
	RegisterResponse,
} from './auth.types'

export const authApi = createApi({
	reducerPath: 'auth/api',
	baseQuery: baseRestPublicQuery,
	endpoints: (builder) => ({
		register: builder.mutation<RegisterResponse, RegisterBody>({
			query: (body) => ({
				url: 'auth/local/register',
				method: 'POST',
				body,
			}),
		}),

		login: builder.mutation<LoginResponse, LoginBody>({
			query: (body) => ({
				url: 'auth/local',
				method: 'POST',
				body,
			}),
		}),

		//	TODO: restore password
	}),
})

export const { useLoginMutation, useRegisterMutation } = authApi
