import './init/i18n'

import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import OverlayScrollbars from 'overlayscrollbars'
import { createRoot } from 'react-dom/client'

import { Root } from '@@/Root'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import 'overlayscrollbars/css/OverlayScrollbars.css'
import './assets/fonts/index.scss'
import './assets/styles/variables/index.styl'
import './assets/styles/global.scss'

if (process.env.REACT_APP_REACT_DEVTOOLS !== 'true') {
	disableReactDevTools()
}

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<Root />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

OverlayScrollbars(document.body, {
	scrollbars: {
		autoHide: 'move',
	},
})
