import { FC } from 'react'
import { css } from '@emotion/react'

import { AuthForm } from '@@/features/forms'
import { withAuthCheck } from '@@/hocs'

const WelcomePage: FC = () => {
	return (
		<section
			css={css`
				display: grid;
				grid-template-columns: 1fr 400px;
			`}
		>
			<div
				css={css`
					padding: 50px;
				`}
			>
				<h2>WelcomePage</h2>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
					cumque dolorem dolorum magni necessitatibus odio praesentium quis!
					Autem est impedit numquam obcaecati odit perferendis quam rerum totam
					vel voluptatibus. Quisquam.
				</p>
				<p>
					A doloribus eaque eos error, facere, id incidunt magni mollitia nihil
					placeat quaerat quibusdam quisquam ratione ut velit voluptas
					voluptatem! Culpa id illo iusto libero nam possimus qui sequi sunt.
				</p>

				<ul>
					<li>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure,
						obcaecati!
					</li>
					<li>
						Enim eum impedit ipsum, labore perferendis qui quia quisquam vitae.
					</li>
					<li>
						Aliquam aliquid, delectus eum ipsa nam neque nihil reprehenderit
						velit.
					</li>
					<li>
						Ab amet dolorum eum incidunt magnam nam neque nostrum sapiente.
					</li>
				</ul>
			</div>

			<div
				css={css`
					padding: 50px;
				`}
			>
				<AuthForm />
			</div>
		</section>
	)
}

export default withAuthCheck({ redirectTo: '/', isPublicOnly: true })(
	WelcomePage
)
