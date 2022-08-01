import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { withAuthCheck } from '@@/hocs'

const RootPage: FC = () => {
	const { t } = useTranslation()

	return (
		<section>
			<h2>{t('root')} PAGE</h2>
		</section>
	)
}

export default withAuthCheck({ redirectTo: '/welcome' })(RootPage)
