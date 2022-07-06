import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react';
import { useTranslation } from 'react-i18next'
import { availableLanguages } from './i18n'
import logo from './logo.svg';
import './App.css';

const Select = styled.select`
  margin: 20px
`

const padding = css`padding: 10px 20px`

function App() {
  const {t, i18n} = useTranslation('main')

  return (
    <div className="App" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p css={css`border: 2px dashed red; ${padding};`}>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('learnText')}
        </a>
        <Select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          {availableLanguages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </Select>
      </header>
    </div>
  );
}

export default App;
