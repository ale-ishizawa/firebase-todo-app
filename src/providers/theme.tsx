import { ReactNode, createContext, useState } from 'react';
import { Theme, getTheme } from '../theme';
import { ThemeProvider } from '@emotion/react';

type ThemeContextType = {
  currentTheme: Theme;
  setTheme: ((theme: Theme) => void) | null;
};

export const AppThemeContext = createContext<ThemeContextType>({
  currentTheme: Theme.LIGHT,
  setTheme: null,
});

type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({
  children,
}: AppThemeProviderProps): JSX.Element => {
  const addOrRemoveBodyClass = (theme: Theme): void => {
    if (theme === Theme.DARK) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  };

  const getCurrentTheme = (): Theme => {
    const currentTheme = sessionStorage.getItem('theme')
      ? (sessionStorage.getItem('theme') as Theme)
      : Theme.LIGHT;
    addOrRemoveBodyClass(currentTheme);
    return currentTheme;
  };

  const currentTheme = getCurrentTheme();

  const [theme, _setCurrentTheme] = useState<Theme>(currentTheme);

  const setTheme = (theme: Theme): void => {
    sessionStorage.setItem('theme', theme);
    addOrRemoveBodyClass(theme);
    _setCurrentTheme(theme);
  };

  const value = {
    currentTheme: theme,
    setTheme,
  };

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider theme={getTheme(theme)}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
};
