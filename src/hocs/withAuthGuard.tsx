import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { validateToken } from '@@/helpers'
import { selectAccessToken } from '@@/store/auth/auth.selectors'
import { authActions } from '@@/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '@@/store/hooks'

export const withAuthGuard = (Component: FC, redirectTo = '/') => {
	return function WithAuthGuardComponent(props: any) {
		const accessToken = useAppSelector(selectAccessToken)

		const dispatch = useAppDispatch()

		if (!accessToken) {
			return <Navigate replace to={redirectTo} />
		}

		if (!validateToken(accessToken!)) {
			requestAnimationFrame(() => {
				dispatch(authActions.logout())
			})

			return <Navigate replace to={redirectTo} />
		}

		return <Component {...props} />
	}
}
