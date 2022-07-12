import { FC } from 'react'

import { selectCart } from '@@/store/cart/cart.selectors'
import { cartActions } from '@@/store/cart/cart.slice'
import { useAppDispatch, useAppSelector } from '@@/store/hooks'
import { useGetProductsQuery } from '@@/store/products/products.api'
import { IProduct } from '@@/store/products/products.types'

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
