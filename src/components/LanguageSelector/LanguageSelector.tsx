import { availableLanguages } from '@@/i18n'
import styled from '@emotion/styled'
import { useTranslation } from 'react-i18next'
import './language-selector.styl'

const Select = styled.select`
  margin: 20px
`

export const LanguageSelector = () => {
  const {i18n} = useTranslation()

  return <Select className='language-selector' defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
    {availableLanguages.map((language) => (
      <option key={language}>{language}</option>
    ))}
  </Select>
}
