import { createAppSelector } from '@@/store/helpers'

export const selectIsUser = createAppSelector((state) => !!state.auth.user)
export const selectAccessToken = createAppSelector((state) => state.auth.token)
