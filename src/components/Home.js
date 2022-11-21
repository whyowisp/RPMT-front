import { Container, Typography, Box } from '@mui/material'
import Image from 'mui-image'
import AMsnakes from '../images/arm-snakes.png'

const Home = () => {
  return (
    <Container sx={{ width: 400 }}>
      <Image src={AMsnakes} />
      <Typography textAlign="center" variant="h6">
        Ars Magica Campaign Management Tool
      </Typography>
    </Container>
  )
}

export default Home
