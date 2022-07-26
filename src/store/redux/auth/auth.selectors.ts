import { createAppSelector } from '@@/init/redux/helpers'

export const selectIsUser = createAppSelector((state) => !!state.auth.user)
export const selectAccessToken = createAppSelector((state) => state.auth.token)
