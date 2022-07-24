import jwtDecode, { JwtPayload } from 'jwt-decode'

import { validateToken } from './validateToken'

jest.mock('jwt-decode')

const mockedJwtDecode = jwtDecode as jest.Mock<Pick<JwtPayload, 'exp'>>

describe('validate token helper', () => {
	it('valid token returns "true"', () => {
		mockedJwtDecode.mockReturnValue({
			exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
		})

		const result = validateToken('VALID_TOKEN')

		expect(result).toBeTruthy()
	})

	it('expired token returns "false"', () => {
		mockedJwtDecode.mockReturnValue({
			exp: Math.floor(Date.now() / 1000 - 24 * 60 * 60),
		})

		const result = validateToken('EXPIRED_TOKEN')

		expect(result).toBeFalsy()
	})

	it('invalid token returns "false"', () => {
		const result = validateToken('INVALID_TOKEN')

		expect(result).toBeFalsy()
	})
})
