import { FC, useState } from 'react'
import { Button, Checkbox, FormControlLabel } from '@mui/material'

import { useAppDispatch } from '@@/init/redux/hooks'
import { authActions } from '@@/store/redux/auth/auth.slice'
import type { AuthResponse } from '@@/store/redux/auth/auth.types'
import { AuthFormLogin } from '../AuthFormLogin'
import { AuthFormRegister } from '../AuthFormRegister'
import type { AuthFormProps } from './AuthForm.types'

//	TODO: restore password
const authVariants = ['login', 'register'] as const

type AuthVariants = typeof authVariants[number]

type Forms = {
	[F in AuthVariants]: FC<AuthFormProps<AuthResponse>>
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

	const checkBoxChangeHandler = (): void => setIsRemember((prev) => !prev)

	const onSuccessHandler = (data: AuthResponse): void => {
		dispatch(
			authActions.setCredentials({
				token: data.jwt,
				refreshToken: null,
				user: data.user.username,
				isRemember,
			})
		)
	}

	const Form = forms[authType]

	return (
		<div>
			<Form onSuccessHandler={onSuccessHandler} />

			<FormControlLabel
				control={
					<Checkbox checked={isRemember} onChange={checkBoxChangeHandler} />
				}
				label="REMEMBER ME"
			/>

			<div>
				{authVariants
					.filter((variant) => variant !== authType)
					.map((variant) => (
						<Button
							key={variant}
							variant="text"
							onClick={() => setAuthType(variant)}
						>
							{variant}
						</Button>
					))}
			</div>
		</div>
	)
}
