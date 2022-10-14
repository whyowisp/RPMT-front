import { createTheme } from '@mui/material'

const plainInputSx = {
  '& input': { backgroundColor: 'rgb(0, 0, 0, 0)', padding: 0.7 },
  '& input:hover': { backgroundColor: '#cad9ec' },
  '& input:focus': { backgroundColor: 'rgb(0, 0, 0, 0.1)' },
  width: '100%',
}

const smallBoxSx = {
  p: 2,
  border: '2px solid',
  backgroundColor: 'rgb(255, 255, 255, 0.5)',
}

const commonBoxSx = {
  p: 2,
  border: '2px solid',
  backgroundColor: 'rgb(255, 255, 255, 0.5)',
}

const okButton = {
  margin: 0,
  padding: 0,
  fontSize: 20,
  color: 'secondary.main',
  backgroundColor: '#fff',
}

const sheetThemeAM = createTheme({
  palette: {
    background: {
      default: '#eaebec',
      input: '#ff8f00',
    },
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: 'serif',
    label: {
      fontFamily: 'MedievalSharp',
      fontSize: '1.5rem',
      textAlign: 'center',
    },
    labelSm: {
      fontSize: '1.1rem',
      fontFamily: 'serif',
    },
  },
})

const mainTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#781d22',
      contrastText: '#dae097',
    },
    secondary: {
      main: '#9dada4',
      contrastText: '#dae097',
    },
  },
  typography: {
    fontFamily: 'Do Hyeon',
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
})

export {
  plainInputSx,
  smallBoxSx,
  commonBoxSx,
  sheetThemeAM,
  mainTheme,
  okButton,
}
