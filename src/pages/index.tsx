import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetAboutQuery } from '@@/store/about/about.api'

const RootPage: FC = () => {
	const { t } = useTranslation()

	const { data, isLoading, error } = useGetAboutQuery()

	useEffect(() => {
		console.log(isLoading)
	}, [isLoading])

	useEffect(() => {
		console.log(data)
	}, [data])

	useEffect(() => {
		console.log(error)
	}, [error])

	return (
		<section>
			<h2>{t('root')} PAGE</h2>
		</section>
	)
}

export default RootPage
