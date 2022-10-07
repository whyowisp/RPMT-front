import { createTheme } from '@mui/material'

const plainInputSx = {
  '& input': { backgroundColor: 'white', padding: 0.7 },
  '& input:hover': { backgroundColor: 'whitesmoke' },
  '& input:focus': { backgroundColor: '#cad9ec', borderBottom: '1px dotted' },
  width: '100%',
}

const smallBoxSx = {
  p: 2,
  width: 278,
  border: '2px solid',
  margin: 1,
  backgroundColor: 'primary.main',
}

const commonBoxSx = {
  p: 2,
  width: 570,
  border: '2px solid',
  margin: 1,
  backgroundColor: 'primary.main',
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

const testTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ff8f00',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#310000',
      paper: '#731010',
    },
  },
  typography: {
    fontFamily: 'Do Hyeon',
  },
  shape: {
    borderRadius: 16,
  },
})

export {
  plainInputSx,
  smallBoxSx,
  commonBoxSx,
  sheetThemeAM,
  testTheme,
  okButton,
}
