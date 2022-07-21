import { createAppSelector } from '@@/store/helpers'

export const selectIsUser = createAppSelector((state) => !!state.auth.user)
