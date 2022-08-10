import type { LoginResponse } from '@@/store/redux/auth/auth.types'
import type { AuthFormProps } from '../AuthForm/AuthForm.types'

export type AuthFormLoginProps = AuthFormProps<LoginResponse>
