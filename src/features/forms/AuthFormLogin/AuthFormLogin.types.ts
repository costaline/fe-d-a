import { LoginResponse } from '@@/store/redux/auth/auth.types'

export interface AuthFormLoginProps {
	onSubmitHandler: (data: LoginResponse) => void
}
