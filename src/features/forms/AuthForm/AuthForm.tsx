import { createElement, FC, useState } from 'react'

import { useAppDispatch } from '@@/init/redux/hooks'
import { authActions } from '@@/store/redux/auth/auth.slice'
import { AuthResponse } from '@@/store/redux/auth/auth.types'
import { AuthFormLogin } from '../AuthFormLogin'
import { AuthFormRegister } from '../AuthFormRegister'

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

export const AuthForm: FC = () => {
	const [authType, setAuthType] = useState<AuthVariants>('login')

	const [isRemember, setIsRemember] = useState(false)

	const dispatch = useAppDispatch()

	const onSubmitHandler = (data: AuthResponse): void => {
		dispatch(
			authActions.setCredentials({
				token: data.jwt,
				refreshToken: null,
				user: data.user.username,
				isRemember,
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
				<input
					checked={isRemember}
					name="remember"
					type="checkbox"
					onChange={() => setIsRemember((prev) => !prev)}
				/>
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
