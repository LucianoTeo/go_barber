import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import AppProvider from './hooks/index';

import GLobalStyle from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GLobalStyle />
  </BrowserRouter>
);

export default App;
