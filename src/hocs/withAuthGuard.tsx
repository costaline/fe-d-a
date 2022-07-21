import { FC } from 'react'
import { Navigate } from 'react-router-dom'

import { selectIsUser } from '@@/store/auth/auth.selectors'
import { useAppSelector } from '@@/store/hooks'

export const withAuthGuard = (Component: FC, redirectTo = '/') => {
	return function WithAuthGuardComponent(props: any) {
		const isUser = useAppSelector(selectIsUser)

		if (!isUser) {
			return <Navigate replace to={redirectTo} />
		}

		return <Component {...props} />
	}
}
