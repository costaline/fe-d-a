/* eslint-disable no-console */
import { getCssVar } from './getCssVar'

describe('css var helper', () => {
	let element

	const varName = '--black'
	const varValue = '#000000'

	beforeAll(() => {
		element = document.createElement('div')
		element.style.setProperty(varName, varValue)

		jest.spyOn(console, 'warn')
		jest.spyOn(console, 'error')

		console.warn.mockImplementation(() => undefined)
		console.error.mockImplementation(() => undefined)
	})

	afterAll(() => {
		console.warn.mockRestore()
		console.error.mockRestore()
	})

	describe('check property value:', () => {
		it('value is not exist', () => {
			expect(getCssVar('--foo-bar-baz', '', element)).toBe('')
		})

		it('value is not exist, but there is a fallback', () => {
			const fallbackValue = 'red'

			expect(getCssVar('--foo-bar-baz', fallbackValue, element)).toStrictEqual(
				fallbackValue
			)
		})

		it('value is exist', () => {
			expect(getCssVar(varName, '', element)).toStrictEqual(varValue)
		})
	})

	describe('check property name:', () => {
		it('name is valid', () => {
			expect(() => getCssVar('--red')).not.toThrow()
		})

		it('name is invalid', () => {
			console.warn.mockRestore()
			console.error.mockRestore()

			expect(() => getCssVar('red')).toThrow()
			expect(() => getCssVar()).toThrow()
		})

		it('name type is invalid', () => {
			jest.spyOn(console, 'warn')
			jest.spyOn(console, 'error')

			console.warn.mockImplementation(() => undefined)
			console.error.mockImplementation(() => undefined)

			expect(() => getCssVar(42)).toThrow()
		})
	})
})
