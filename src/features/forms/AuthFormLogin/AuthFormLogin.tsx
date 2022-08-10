import { FC, useEffect } from 'react'
import { Box, Button, FormHelperText, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import { getErrorMessage } from '@@/helpers/getErrorMessage'
import { useLoginMutation } from '@@/store/redux/auth/auth.api'
import { LoginBody } from '@@/store/redux/auth/auth.types'
import type { AuthFormLoginProps } from './AuthFormLogin.types'

export const AuthFormLogin: FC<AuthFormLoginProps> = ({ onSuccessHandler }) => {
	const [callLogin, { data, isLoading, error, isSuccess, isError }] =
		useLoginMutation()

	const {
		handleSubmit,
		control,
		clearErrors,
		formState: { isValid, errors, isDirty },
	} = useForm<LoginBody>({
		mode: 'all',
		defaultValues: {
			identifier: '',
			password: '',
		},
	})

	const onSubmit = (formData: LoginBody): void => {
		void callLogin(formData)
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
					backgroundColor: '',
					opacity: 0.5,
				},
			}}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Controller
				control={control}
				name="identifier"
				render={({ field }) => (
					<TextField
						{...field}
						required
						error={!!errors.identifier?.message}
						helperText={errors.identifier?.message}
						label="IDENTIFIER (EMAIL/USERNAME)"
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
						clearErrors('identifier')
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
