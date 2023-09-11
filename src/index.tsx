import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './providers/auth';
import { AppThemeProvider } from './providers/theme';
import { CssBaseline } from '@mui/material';
import { AppRouterProvider } from './providers/route';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppThemeProvider>
        <CssBaseline />
        <AppRouterProvider />
      </AppThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
