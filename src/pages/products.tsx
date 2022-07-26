import { FC } from 'react'

import { useAppDispatch, useAppSelector } from '@@/init/redux/hooks'
import { selectCart } from '@@/store/redux/cart/cart.selectors'
import { cartActions } from '@@/store/redux/cart/cart.slice'
import { useGetProductsQuery } from '@@/store/redux/products/products.api'
import { IProduct } from '@@/store/redux/products/products.types'

const product: IProduct = { id: 42, title: 'Some title' }

const ProductsPage: FC = () => {
	const { data, isLoading, error } = useGetProductsQuery(6)

	const dispatch = useAppDispatch()

	const cart = useAppSelector(selectCart)

	const isExistsInCart = cart.some((p) => p.id === product.id)

	if (isLoading) return <div>LOADING</div>

	if (error) return <div>ERROR</div>

	return (
		<section>
			<h2>Products Page</h2>
			<div>Data: {!!data}</div>

			<button
				type="button"
				onClick={() =>
					!isExistsInCart &&
					dispatch(cartActions.addItem({ id: 1, title: 'foo' }))
				}
			>
				{isExistsInCart ? 'Already' : 'Add'}
			</button>
		</section>
	)
}

export default ProductsPage
