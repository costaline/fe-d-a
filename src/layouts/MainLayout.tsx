import { FC, PropsWithChildren } from 'react'
import { css } from '@emotion/react'

import { SideBar } from '@@/features/bars/SideBar'
import { useAppSelector } from '@@/init/redux/hooks'
import { selectIsUser } from '@@/store/redux/auth/auth.selectors'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
	const isUser = useAppSelector(selectIsUser)

	return (
		<div
			css={css`
				position: relative;
			`}
		>
			{isUser && (
				<div
					css={css`
						position: fixed;
						top: 0;
						bottom: 0;
						left: 0;

						width: ${200}px;
					`}
				>
					<SideBar />
				</div>
			)}

			<main
				css={css`
					margin-left: ${isUser ? 200 : 0}px;
					padding-left: 10px;
				`}
			>
				{children}
			</main>
		</div>
	)
}
