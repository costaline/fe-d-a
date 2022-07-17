import { FC, StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import FileBasedRouting from '@@/features/FileBasedRouting/lazy'
import { persistor, store } from '@@/store'

export const Root: FC = () => {
	return (
		<StrictMode>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter>
						<FileBasedRouting />
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</StrictMode>
	)
}
