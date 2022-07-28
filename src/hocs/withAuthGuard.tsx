import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { validateToken } from '@@/helpers'
import { useAppDispatch, useAppSelector } from '@@/init/redux/hooks'
import { selectAccessToken } from '@@/store/redux/auth/auth.selectors'
import { authActions } from '@@/store/redux/auth/auth.slice'

export const withAuthGuard = (Component: FC, redirectTo = '/') => {
	return function WithAuthGuardComponent(props: any) {
		const accessToken = useAppSelector(selectAccessToken)

		const dispatch = useAppDispatch()

		if (!accessToken) {
			return <Navigate replace to={redirectTo} />
		}

		if (!validateToken(accessToken)) {
			requestAnimationFrame(() => {
				dispatch(authActions.logout())
			})

			return <Navigate replace to={redirectTo} />
		}

		return <Component {...props} />
	}
}
