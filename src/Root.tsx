import { FC, StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import FileBasedRouting from '@@/features/FileBasedRouting/lazy'

export const Root: FC = () => {
	return (
		<StrictMode>
			<BrowserRouter>
				<FileBasedRouting />
			</BrowserRouter>
		</StrictMode>
	)
}
