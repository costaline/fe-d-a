import './i18n'

import { createRoot } from 'react-dom/client'

import { Root } from '@@/Root'
import reportWebVitals from './reportWebVitals'

import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import './assets/fonts/index.scss'
import './assets/styles/variables/index.styl'
import './assets/styles/global.scss'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(<Root />)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
