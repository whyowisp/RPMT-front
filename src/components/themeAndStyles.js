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
      default: '#c6ccb2',
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
  /*
  palette: {
    type: 'dark',
    primary: {
      main: '#781d22',
      contrastText: '#dae097',
      okStatus: '#689f38',
    },
    secondary: {
      main: '#9dada4',
      contrastText: '#dae097',
    },
    background: {
      default: '#A9BAB0',
      paper: '#92A198',
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
  },*/

  palette: {
    type: 'light',
    primary: {
      main: '#bf4e30',
      contrastText: '#ddd',
    },
    secondary: {
      main: '#093824',
    },
    background: {
      default: '#c6ccb2',
      paper: '#EDF5D5',
    },
    headerAppBar: {
      main: '#115A73',
      contrastText: '#ddd',
    },
    customIcon: {
      main: '#e5eafa',
      contrastText: '#77918f',
    },
    customAppBar: {
      main: '#4A4D43',
      contrastText: '#ccc',
    },
    characterHidden: {
      main: '#B5BDA4',
      contrastText: '#ddd',
    },
    characterInfo: {
      contrastText: '#444',
    },
  },
  typography: {
    fontFamily: 'Do Hyeon',
  } /*
  palette: {
    type: 'dark',
    primary: {
      main: '#6B878F',
      contrastText: '#eeeeee',
    },
    secondary: {
      main: '#C5C1C9',
      contrastText: '#445449',
    },
    background: {
      default: '#666',
      paper: '#6D9C8C',
    },
  },
  typography: {
    fontFamily: 'Do Hyeon',
  },*/,
})

export {
  plainInputSx,
  smallBoxSx,
  commonBoxSx,
  sheetThemeAM,
  mainTheme,
  okButton,
}
