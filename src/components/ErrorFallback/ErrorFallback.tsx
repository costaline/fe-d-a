import { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'

export const ErrorFallback: FC<FallbackProps> = ({
	error,
	resetErrorBoundary,
}) => {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button type="button" onClick={resetErrorBoundary}>
				Try again
			</button>
		</div>
	)
}
