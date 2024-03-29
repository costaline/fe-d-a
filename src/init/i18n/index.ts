import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

export const availableLanguages = ['en', 'ru']

// eslint-disable-next-line import/no-named-as-default-member
void i18next
	.use(initReactI18next)
	.use(
		resourcesToBackend((language, namespace, callback) => {
			import(`./${language}/${namespace}.json`)
				.then((resources) => {
					callback(null, resources)
				})
				.catch((error) => {
					callback(error, null)
				})
		})
	)
	.use(LanguageDetector)
	.init({
		debug: process.env.NODE_ENV === 'development',
		defaultNS: 'main',
		ns: ['main'],
		fallbackLng: 'en',
	})
