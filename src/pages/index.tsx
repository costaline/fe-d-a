import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const RootPage: FC = () => {
	const { t } = useTranslation()

	return (
		<section>
			<h2>{t('root')} PAGE</h2>
		</section>
	)
}

export default RootPage
