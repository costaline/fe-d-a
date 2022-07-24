import jwtDecode, { JwtPayload } from 'jwt-decode'

export const validateToken = (token: string) => {
	try {
		const { exp } = jwtDecode<Pick<Required<JwtPayload>, 'exp'>>(token)

		return Date.now() < exp * 1000
	} catch {
		return false
	}
}
