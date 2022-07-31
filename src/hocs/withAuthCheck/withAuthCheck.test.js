import { render } from '@testing-library/react'
import * as ReactRedux from 'react-redux'
import * as ReactRouterDom from 'react-router-dom'

import * as Helpers from '@@/helpers'
import { withAuthCheck } from './withAuthCheck'

jest.mock('react-redux')
jest.mock('react-router-dom')
jest.mock('@@/helpers')

const spyUseSelector = jest.spyOn(ReactRedux, 'useSelector')
const spyNavigate = jest.spyOn(ReactRouterDom, 'Navigate')
const spyValidateToken = jest.spyOn(Helpers, 'validateToken')

const MockComponent = jest.fn(() => null)

describe('withAuthCheck', () => {
	describe('public only', () => {
		it('with token renders redirect', () => {
			spyUseSelector.mockReturnValue('TOKEN')

			const Component = withAuthCheck({ isPublicOnly: true, redirectTo: '/' })(
				MockComponent
			)

			render(<Component />)

			expect(MockComponent).not.toHaveBeenCalled()
			expect(spyNavigate).toHaveBeenCalledTimes(1)
		})

		it('without token renders component', () => {
			spyUseSelector.mockReturnValue(null)

			const Component = withAuthCheck({ isPublicOnly: true, redirectTo: '/' })(
				MockComponent
			)

			render(<Component />)

			expect(MockComponent).toHaveBeenCalled()
			expect(spyNavigate).not.toHaveBeenCalled()
		})
	})

	describe('private', () => {
		it('without token renders redirect', () => {
			spyUseSelector.mockReturnValue(null)

			const Component = withAuthCheck({ redirectTo: '/' })(MockComponent)

			render(<Component />)

			expect(MockComponent).not.toHaveBeenCalled()
			expect(spyNavigate).toHaveBeenCalledTimes(1)
		})

		it('with valid token renders component', () => {
			spyUseSelector.mockReturnValue('VALID TOKEN')
			spyValidateToken.mockReturnValue(true)

			const Component = withAuthCheck({ redirectTo: '/' })(MockComponent)

			render(<Component />)

			expect(MockComponent).toHaveBeenCalled()
			expect(spyNavigate).not.toHaveBeenCalled()
		})

		it('with invalid token renders redirect', () => {
			spyUseSelector.mockReturnValue('INVALID TOKEN')
			spyValidateToken.mockReturnValue(false)

			const Component = withAuthCheck({ redirectTo: '/' })(MockComponent)

			render(<Component />)

			expect(MockComponent).not.toHaveBeenCalled()
			expect(spyNavigate).toHaveBeenCalledTimes(1)
		})
	})
})
