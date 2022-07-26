import { LoginResponse } from '@@/store/redux/auth/auth.types'

export type AuthFormLoginProps = {
	onSubmitHandler: (data: LoginResponse) => void
}
