import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from "./redux/store"
import { Provider } from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { positions, transitions, Provider as AlertProvider } from "react-alert"
import AlertTemplate from "react-alert-template-basic"


const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
};


const theme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#D23F57',
      dark: '#CE2441',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#0066ff',
      main: '#7D879C',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#FFF',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});




ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


