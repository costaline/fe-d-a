import { FC, StrictMode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { ErrorFallback } from '@@/components'
import FileBasedRouting from '@@/features/routing/FileBasedRouting/lazy'
import { persistor, store } from '@@/init/redux'

export const Root: FC = () => {
	return (
		<StrictMode>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<BrowserRouter>
							<FileBasedRouting />
						</BrowserRouter>
					</PersistGate>
				</Provider>
			</ErrorBoundary>
		</StrictMode>
	)
}
