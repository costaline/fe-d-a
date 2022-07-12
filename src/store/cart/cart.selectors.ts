import { createAppSelector } from '@@/store/helpers'

export const selectCart = createAppSelector((state) => state.cart)
