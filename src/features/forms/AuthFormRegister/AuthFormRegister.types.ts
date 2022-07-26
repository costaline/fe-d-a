import { RegisterResponse } from '@@/store/redux/auth/auth.types'

export type AuthFormRegisterProps = {
	onSubmitHandler: (data: RegisterResponse) => void
}
