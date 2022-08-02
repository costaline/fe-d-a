import type { TypedAddListener } from '@reduxjs/toolkit'
import { addListener, createListenerMiddleware } from '@reduxjs/toolkit'

import type {
	AddListener,
	AppDispatch,
	AppStartListening,
	RootState,
} from '@@/init/redux/types'
import { addAuthListeners } from '@@/store/redux/auth/auth.listenerMiddleware'

export const listenerMiddleware = createListenerMiddleware()

export const startAppListening =
	listenerMiddleware.startListening as AppStartListening

export const addAppListener = addListener as TypedAddListener<
	RootState,
	AppDispatch
>

const listeners: AddListener[] = [...addAuthListeners]

listeners.forEach((listener) => listener(startAppListening))
