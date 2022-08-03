import { PERSIST } from 'redux-persist'

import type { AddListener } from '@@/init/redux/types'
import { resetStoreAction } from '@@/store/redux'
import { persistUser } from './auth.helpers'
import { authActions } from './auth.slice'

const addInitListener: AddListener = (startListening) => {
	startListening({
		type: PERSIST,

		effect: (action, { dispatch }) => {
			const persist = persistUser.get()

			if (persist) {
				dispatch(authActions.setCredentials(persist))
			}
		},
	})
}

const addSetCredentialsListener: AddListener = (startListening) => {
	startListening({
		actionCreator: authActions.setCredentials,

		effect: (action) => {
			persistUser.save(action.payload)
		},
	})
}

const addUpdateCredentialsListener: AddListener = (startListener) => {
	startListener({
		actionCreator: authActions.updateCredentials,

		effect: (action) => {
			const persist = persistUser.get()

			if (persist) {
				persistUser.save({ ...persist, ...action.payload })
			}
		},
	})
}

const addLogoutListener: AddListener = (startListener) => {
	startListener({
		actionCreator: authActions.logout,

		effect: (_, { dispatch }) => {
			persistUser.remove()

			dispatch(resetStoreAction())
		},
	})
}

export const addAuthListeners = [
	addInitListener,
	addSetCredentialsListener,
	addUpdateCredentialsListener,
	addLogoutListener,
]
