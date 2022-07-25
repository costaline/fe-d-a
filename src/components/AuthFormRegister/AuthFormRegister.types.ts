import { RegisterResponse } from '@@/store/auth/auth.types'

export type AuthFormRegisterProps = {
	onSubmitHandler: (data: RegisterResponse) => void
}
