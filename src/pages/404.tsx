import { FC } from 'react'
import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'

export const NotFoundPage: FC = () => {
	const { t } = useTranslation()

	return (
		<section
			css={css`
				display: grid;
				grid-auto-flow: column;
				column-gap: 20px;
				align-content: center;
				align-items: center;
				justify-content: center;
				justify-items: center;

				width: 100vw;
				height: 100vh;
			`}
		>
			<h2>404</h2>
			<p>{t('404.errorMessage')}</p>
		</section>
	)
}

export default NotFoundPage
