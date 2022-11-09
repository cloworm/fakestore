import { FunctionComponent } from 'react'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Typography gutterBottom>Home</Typography>
      <Typography>Welcome to fakestore. View our <RouterLink to="/products">Products</RouterLink>.</Typography>
    </div>
  )
}

export default Home
