import { createAppSelector } from '@@/init/redux/helpers'

export const selectCart = createAppSelector((state) => state.cart)
