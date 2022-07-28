import { FC, useEffect } from 'react'
import { css } from '@emotion/react'
import { useForm } from 'react-hook-form'

import { getErrorMessage } from '@@/helpers/getErrorMessage'
import { useLoginMutation } from '@@/store/redux/auth/auth.api'
import { LoginBody } from '@@/store/redux/auth/auth.types'
import { AuthFormLoginProps } from './AuthFormLogin.types'

export const AuthFormLogin: FC<AuthFormLoginProps> = ({ onSubmitHandler }) => {
	const [callLogin, { data, isLoading, error, isSuccess, isError }] =
		useLoginMutation()

	const {
		handleSubmit,
		formState: { isValid, errors },
		register,
	} = useForm<LoginBody>({ mode: 'onBlur' })

	const onSubmit = (formData: LoginBody): void => {
		void callLogin(formData)
	}

	useEffect(() => {
		if (!(isSuccess && data?.jwt)) return

		onSubmitHandler(data)
	}, [data, isSuccess, onSubmitHandler])

	return (
		<form
			css={css`
				display: flex;
				flex-direction: column;
				row-gap: 10px;

				label {
					display: grid;
					row-gap: 10px;

					padding: 10px;

					border: 2px solid lightgreen;
				}
			`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<label>
				<span>IDENTIFIER (EMAIL/USERNAME)</span>
				<input
					type="text"
					{...register('identifier', {
						required: {
							value: true,
							message: 'Required',
						},
						minLength: {
							value: 6,
							message: 'Too short',
						},
					})}
				/>
				<span>{errors.identifier?.message ?? null}</span>
			</label>

			<label>
				<span>PASSWORD</span>
				<input
					type="password"
					{...register('password', {
						required: {
							value: true,
							message: 'Required',
						},
						minLength: {
							value: 6,
							message: 'Too short',
						},
					})}
				/>
				<span>{errors.password?.message ?? null}</span>
			</label>

			{isError && <span>{getErrorMessage(error)}</span>}

			<button disabled={!isValid || isLoading} type="submit">
				SUBMIT
			</button>
		</form>
	)
}
