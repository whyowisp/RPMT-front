import { createTheme } from '@mui/material'

const plainInputSx = {
  '& input': { backgroundColor: 'rgb(255, 255, 255, 0.1)', padding: 0.7 },
  '& input:hover': { backgroundColor: 'rgb(202, 217, 236, 0.2)' },
  '& input:focus': { backgroundColor: 'rgb(0, 0, 0, 0.1)' },
  width: '100%',
}

const smallBoxSx = {
  p: 1.5,
  border: '2px solid',

  backgroundColor: 'rgb(255, 255, 255, 0.5)',
}

const commonBoxSx = {
  p: 1.5,
  border: '2px solid',

  backgroundColor: 'rgb(255, 255, 255, 0.5)',
}

const okButton = {
  margin: 0,
  padding: 0,
  fontSize: 20,
  color: 'secondary.main',
  backgroundColor: 'rgb(255,255,255,0.0)',
}

const sheetThemeAM = createTheme({
  palette: {
    primary: {
      main: '#646E68',
      contrastText: '#dae097',
    },
    secondary: {
      main: '#7FCF76',
    },
    info: {
      main: '#5C5C5C',
    },
    background: {
      default: '#A9BAB0',
    },
  },
  typography: {
    fontFamily: 'serif',
    label: {
      fontFamily: 'MedievalSharp',
      fontSize: '1.4rem',
      textAlign: 'center',
    },
    labelSm: {
      fontSize: '1.0rem',
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
    background: {
      default: '#dcf1e5',
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
