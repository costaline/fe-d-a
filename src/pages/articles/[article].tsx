import { FC, useEffect } from 'react'

import { useGetArticleQuery } from '@@/store/articles/articles.api'

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

export default ArticlePage
