/* eslint-disable no-console */
import { FC, useEffect } from 'react'

import { withAuthGuard } from '@@/hocs'
import { useGetArticleQuery } from '@@/store/redux/articles/articles.api'

const ArticlePage: FC = () => {
	const { data: articleData } = useGetArticleQuery({ id: '1' })

	useEffect(() => {
		console.log('articleData', articleData)
	}, [articleData])

	return (
		<section>
			<h2>Article PAGE</h2>
		</section>
	)
}

export default withAuthGuard(ArticlePage, '/welcome')
