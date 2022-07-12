import { FC, StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import FileBasedRouting from '@@/features/FileBasedRouting/lazy'
import { store } from '@@/store'

export const Root: FC = () => {
	return (
		<StrictMode>
			<Provider store={store}>
				<BrowserRouter>
					<FileBasedRouting />
				</BrowserRouter>
			</Provider>
		</StrictMode>
	)
}
