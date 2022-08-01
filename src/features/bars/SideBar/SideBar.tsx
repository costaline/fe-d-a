import { FC } from 'react'
import { css } from '@emotion/react'

import { SideBarNav } from '../SideBarNav'

export const SideBar: FC = () => {
	return (
		<aside
			css={css`
				display: grid;
				grid-template-rows: auto 1fr auto;
				row-gap: 20px;

				width: 100%;
				height: 100%;

				border: 2px dashed lightcoral;
			`}
		>
			{/* TODO: logo */}
			<div>LOGO</div>

			<SideBarNav />

			{/* TODO: user menu */}
			<div>USER MENU</div>
		</aside>
	)
}
