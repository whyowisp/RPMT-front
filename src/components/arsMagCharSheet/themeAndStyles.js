import { createTheme } from '@mui/material'

const plainInputSx = {
  '& input': { backgroundColor: 'white', padding: 0.7 },
  '& input:hover': { backgroundColor: 'whitesmoke' },
  '& input:focus': { backgroundColor: '#cad9ec', borderBottom: '1px dotted' },
  width: '100%',
}

const smallBoxSx = {
  p: 2,
  maxWidth: 282,
  border: '1px solid',
  margin: 1,
}

const commonBoxSx = {
  p: 2,
  width: 570,
  border: '1px solid',
  margin: 1,
}

const sheetThemeAM = createTheme({
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

export { plainInputSx, smallBoxSx, commonBoxSx, sheetThemeAM }
