import { FC, useEffect } from 'react'

import { useGetArticlesQuery } from '@@/store/articles/articles.api'

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

export default ArticlesPage
