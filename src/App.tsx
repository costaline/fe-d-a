import React from 'react';
import { useTranslation } from 'react-i18next'
import { availableLanguages } from './i18n'
import logo from './logo.svg';
import './App.css';

function App() {
  const {t, i18n} = useTranslation('main')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
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
        <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
          {availableLanguages.map((language) => (
            <option key={language}>{language}</option>
          ))}
        </select>
      </header>
    </div>
  );
}

export default App;
