import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { validateToken } from '@@/helpers'
import { useAppDispatch, useAppSelector } from '@@/init/redux/hooks'
import { selectAccessToken } from '@@/store/redux/auth/auth.selectors'
import { authActions } from '@@/store/redux/auth/auth.slice'
import { CheckOptions } from './withAuthCheck.types'

// eslint-disable-next-line prettier/prettier
export const withAuthCheck = ({redirectTo = '/', isPublicOnly}: CheckOptions) => (Component: FC) => {
		return function WithAuthGuardComponent(props: any) {
			const accessToken = useAppSelector(selectAccessToken)

			const dispatch = useAppDispatch()

			if (isPublicOnly) {
				return accessToken ? (
					<Navigate to={redirectTo} />
				) : (
					<Component {...props} />
				)
			}

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
