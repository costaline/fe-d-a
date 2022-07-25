import { LoginResponse } from '@@/store/auth/auth.types'

export type AuthFormLoginProps = {
	onSubmitHandler: (data: LoginResponse) => void
}
