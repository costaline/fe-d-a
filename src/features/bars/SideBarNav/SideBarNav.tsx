import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { routes } from '@@/features/routing/FileBasedRouting/lazy'

const links = [
	{ title: 'HOME', to: routes.HOME.routePath, icon: 'I' },
	{ title: 'ARTICLES', to: routes.ARTICLES.routePath, icon: 'I' },
	{ title: 'PRODUCTS', to: routes.PRODUCTS.routePath, icon: 'I' },
]

export const SideBarNav: FC = () => {
	return (
		<nav>
			<ul>
				{links.map(({ title, icon, to }) => (
					<li key={to}>
						<span>{icon}</span>
						<NavLink to={to}>{title}</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
