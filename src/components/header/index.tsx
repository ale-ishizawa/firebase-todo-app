import React, { useContext } from 'react';
import { Button, Grid, IconButton } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Theme } from '../../theme';
import { AppThemeContext } from '../../providers/theme';
import { AuthContext } from '../../providers/auth';
import { MoonIcon, SunIcon } from '../../icons';
import './styles.scss';

function Header() {
  const { currentTheme, setTheme } = useContext(AppThemeContext);
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const headerText = location.pathname === '/login' ? 'LOGIN' : 'TODO';

  const setCurrentTheme = () => {
    const newTheme = currentTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    setTheme && setTheme(newTheme);
  };

  const logout = () => {
    signOut && signOut();
    navigate('/login');
  };
  return (
    <header>
      <Grid container justifyContent="right">
        {user ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </Grid>
      <Grid container justifyContent={'space-between'} mt={5} mb={3}>
        <h1 className="app-header">{headerText}</h1>

        <IconButton
          color="primary"
          aria-label="theme switcher"
          onClick={setCurrentTheme}
        >
          {currentTheme === Theme.DARK ? <SunIcon /> : <MoonIcon />}
        </IconButton>
      </Grid>
    </header>
  );
}

export default Header;
