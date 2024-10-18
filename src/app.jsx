/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import AppProvider from './context/AppProvider'

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AppProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AppProvider>
  );
}
