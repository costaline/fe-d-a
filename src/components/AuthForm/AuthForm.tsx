/* eslint-disable jsx-a11y/label-has-associated-control */
import { createElement, FC, useState } from 'react'

import { AuthFormLogin } from '@@/components/AuthFormLogin'
import { AuthFormRegister } from '@@/components/AuthFormRegister'
import { authActions } from '@@/store/auth/auth.slice'
import { AuthResponse } from '@@/store/auth/auth.types'
import { useAppDispatch } from '@@/store/hooks'

//	TODO: restore password
const authVariants = ['login', 'register'] as const

type AuthVariants = typeof authVariants[number]

type Forms = {
	[F in AuthVariants]: FC<{ onSubmitHandler: (data: AuthResponse) => void }>
}

//	TODO: restore password
const forms: Forms = {
	login: AuthFormLogin,
	register: AuthFormRegister,
}

export const AuthForm = () => {
	const [authType, setAuthType] = useState<AuthVariants>('login')

	const dispatch = useAppDispatch()

	const onSubmitHandler = (data: AuthResponse) => {
		dispatch(
			authActions.setCredentials({
				token: data.jwt,
				refreshToken: null,
				user: data.user.username,
			})
		)
	}

	return (
		<div>
			{createElement(forms[authType], {
				onSubmitHandler,
			})}

			<label>
				<span>REMEMBER ME</span>
				<input type="checkbox" />
			</label>

			<div>
				{authVariants
					.filter((variant) => variant !== authType)
					.map((variant) => (
						<button
							key={variant}
							type="button"
							onClick={() => setAuthType(variant)}
						>
							{variant}
						</button>
					))}
			</div>
		</div>
	)
}
