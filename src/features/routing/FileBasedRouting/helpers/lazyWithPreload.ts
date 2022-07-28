import { ComponentType, lazy } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const lazyWithPreload = (
	factory: () => Promise<{ default: ComponentType }>
) => {
	const Component = lazy(factory)

	return { Component, preload: factory }
}
