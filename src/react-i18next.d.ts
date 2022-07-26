import 'react-i18next'

import main from './init/i18n/en/main.json'

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: 'main'
		resources: {
			main: typeof main
		}
	}
}
