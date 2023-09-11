import React from 'react';
import { Container } from '@mui/material';
import logo from './logo.svg';
import './App.scss';
import Header from './components/header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container maxWidth="sm">
      <Header />
      <main>
        <Outlet />
      </main>
    </Container>
  );
}

export default App;
