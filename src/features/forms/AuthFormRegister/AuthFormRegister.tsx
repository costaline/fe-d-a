import { FC, useEffect } from 'react'
import { css } from '@emotion/react'
import { useForm } from 'react-hook-form'

import { getErrorMessage } from '@@/helpers/getErrorMessage'
import { useRegisterMutation } from '@@/store/redux/auth/auth.api'
import { RegisterBody } from '@@/store/redux/auth/auth.types'
import { AuthFormRegisterProps } from './AuthFormRegister.types'

const emailRegexp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const AuthFormRegister: FC<AuthFormRegisterProps> = ({
	onSubmitHandler,
}) => {
	const [callRegister, { data, isLoading, error, isError, isSuccess }] =
		useRegisterMutation()

	const {
		handleSubmit,
		formState: { isValid, errors },
		register,
	} = useForm<RegisterBody>({ mode: 'onBlur' })

	const onSubmit = (formData: RegisterBody): void => {
		void callRegister(formData)
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
				<span>USERNAME</span>
				<input
					type="text"
					{...register('username', {
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
				<span>{errors.username?.message ?? null}</span>
			</label>

			<label>
				<span>EMAIL</span>
				<input
					type="email"
					{...register('email', {
						required: {
							value: true,
							message: 'Required',
						},
						pattern: {
							value: emailRegexp,
							message: 'Please enter a valid email',
						},
					})}
				/>
				<span>{errors.email?.message ?? null}</span>
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
