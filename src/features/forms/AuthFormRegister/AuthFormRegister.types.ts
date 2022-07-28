import { RegisterResponse } from '@@/store/redux/auth/auth.types'

export interface AuthFormRegisterProps {
	onSubmitHandler: (data: RegisterResponse) => void
}
