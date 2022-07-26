import { store } from './configureStore'

export type RootState = Omit<ReturnType<typeof store.getState>, '_persist'> // omit to prevent loss of types on root level
export type AppDispatch = typeof store.dispatch
