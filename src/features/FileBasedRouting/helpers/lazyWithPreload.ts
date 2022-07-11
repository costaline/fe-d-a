import { ComponentType, lazy } from 'react'

export const lazyWithPreload = (
	factory: () => Promise<{ default: ComponentType }>
) => {
	const Component = lazy(factory)

	return { Component, preload: factory }
}
