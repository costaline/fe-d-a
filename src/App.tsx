import { LanguageSelector } from '@@/components'
import { css } from '@emotion/react'
import React from 'react';
import { useTranslation } from 'react-i18next'
import logo from './logo.svg';
import './App.css';

const padding = css`padding: 10px 20px`

function App() {
  const {t} = useTranslation('main')

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
        <LanguageSelector/>
      </header>
    </div>
  );
}

export default App;
