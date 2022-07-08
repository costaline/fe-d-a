import { FC, StrictMode } from 'react'
import { useTranslation } from 'react-i18next'

export const Root: FC = () => {
	const { t } = useTranslation()

	return (
		<StrictMode>
			<div>{t('root')}</div>
		</StrictMode>
	)
}
