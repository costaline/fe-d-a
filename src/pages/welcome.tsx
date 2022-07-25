import { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthForm } from '@@/components/AuthForm'
import { selectIsUser } from '@@/store/auth/auth.selectors'
import { useAppSelector } from '@@/store/hooks'

const WelcomePage: FC = () => {
	const isUser = useAppSelector(selectIsUser)

	return (
		<section>
			<h2>WelcomePage</h2>

			{!isUser && <AuthForm />}

			<Link to="/articles">ARTICLES PAGE</Link>
		</section>
	)
}

export default WelcomePage
