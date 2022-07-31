/* eslint-disable no-console */
import { FC, useEffect } from 'react'

import { withAuthCheck } from '@@/hocs'
import { useGetArticlesQuery } from '@@/store/redux/articles/articles.api'

const ArticlesPage: FC = () => {
	const { data, isLoading, error } = useGetArticlesQuery({})

	useEffect(() => {
		console.log('isLoading', isLoading)
		console.log('error', error)
		console.log('data', data)
	}, [data, error, isLoading])

	return (
		<section>
			<h2>Articles PAGE</h2>
		</section>
	)
}

export default withAuthCheck({ redirectTo: '/' })(ArticlesPage)
