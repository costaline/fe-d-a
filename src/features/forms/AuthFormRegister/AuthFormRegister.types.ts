import type { RegisterResponse } from '@@/store/redux/auth/auth.types'
import type { AuthFormProps } from '../AuthForm/AuthForm.types'

export type AuthFormRegisterProps = AuthFormProps<RegisterResponse>
