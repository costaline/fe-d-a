import { FC } from 'react'
import { Link } from 'react-router-dom'

import { AuthForm } from '@@/features/forms'
import { useAppSelector } from '@@/init/redux/hooks'
import { selectIsUser } from '@@/store/redux/auth/auth.selectors'

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
