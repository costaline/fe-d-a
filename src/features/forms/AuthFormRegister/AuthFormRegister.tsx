import { FC, useEffect } from 'react'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { getErrorMessage } from '@@/helpers/getErrorMessage'
import { useRegisterMutation } from '@@/store/redux/auth/auth.api'
import { RegisterBody } from '@@/store/redux/auth/auth.types'
import type { AuthFormRegisterProps } from './AuthFormRegister.types'

const emailRegexp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const AuthFormRegister: FC<AuthFormRegisterProps> = ({
	onSuccessHandler,
}) => {
	const [callRegister, { data, isLoading, error, isError, isSuccess }] =
		useRegisterMutation()

	const {
		handleSubmit,
		control,
		clearErrors,
		formState: { isValid, errors, isDirty },
	} = useForm<RegisterBody>({
		mode: 'all',
		defaultValues: {
			email: '',
			password: '',
			username: '',
		},
	})

	const onSubmit = (formData: RegisterBody): void => {
		void callRegister(formData)
	}

	useEffect(() => {
		if (!(isSuccess && data?.jwt)) return

		onSuccessHandler(data)
	}, [data, isSuccess, onSuccessHandler])

	return (
		<Box
			noValidate
			component="form"
			sx={{
				'display': 'flex',
				'flexDirection': 'column',
				'rowGap': '10px',
				'& .MuiInputBase-input': {
					color: 'var(--color-font-primary)',
				},
				'& .MuiFormLabel-root': {
					color: 'var(--color-font-primary)',
				},
				'& .MuiButtonBase-root.Mui-disabled': {
					color: 'var(--color-font-primary)',
					opacity: 0.5,
				},
			}}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				control={control}
				name="username"
				render={({ field }) => (
					<TextField
						{...field}
						required
						error={!!errors.username?.message}
						helperText={errors.username?.message}
						label="USERNAME"
						variant="filled"
					/>
				)}
				rules={{
					required: {
						value: true,
						message: 'Required',
					},
					minLength: {
						value: 6,
						message: 'Too short',
					},
					onChange() {
						clearErrors('username')
					},
				}}
			/>

			<Controller
				control={control}
				name="email"
				render={({ field }) => (
					<TextField
						{...field}
						required
						error={!!errors.email?.message}
						helperText={errors.email?.message}
						label="EMAIL"
						variant="filled"
					/>
				)}
				rules={{
					required: {
						value: true,
						message: 'Required',
					},
					pattern: {
						value: emailRegexp,
						message: 'Please enter a valid email',
					},
					onChange() {
						clearErrors('email')
					},
				}}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field }) => (
					<TextField
						{...field}
						required
						autoComplete="off"
						error={!!errors.password?.message}
						helperText={errors.password?.message}
						label="PASSWORD"
						type="password"
						variant="filled"
					/>
				)}
				rules={{
					required: {
						value: true,
						message: 'Required',
					},
					minLength: {
						value: 6,
						message: 'Too short',
					},
					onChange() {
						clearErrors('password')
					},
				}}
			/>

			{isError && (
				<FormHelperText error>{getErrorMessage(error)}</FormHelperText>
			)}

			<Button
				disabled={!isDirty || (isDirty && !isValid) || isLoading}
				type="submit"
				variant="contained"
			>
				SUBMIT
			</Button>
		</Box>
	)
}
