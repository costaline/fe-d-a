import { render } from '@testing-library/react'

import { NotFoundPage } from '@@/pages/404'

jest.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (key) => key }),
}))

describe('not found page', () => {
	it('snapshot', () => {
		const view = render(<NotFoundPage />)

		expect(view).toMatchSnapshot()
	})
})
