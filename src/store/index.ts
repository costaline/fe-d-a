import { persistStore } from 'redux-persist'

import { store } from './configureStore'
import { RESET_STATE, resetStateAction } from './rootReducer'

const persistor = persistStore(store)

export { persistor, RESET_STATE, resetStateAction, store }

// export type RootState = ReturnType<typeof store.getState>
export type RootState = Omit<ReturnType<typeof store.getState>, '_persist'>
export type AppDispatch = typeof store.dispatch
