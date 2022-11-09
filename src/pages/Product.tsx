import { FunctionComponent, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Chip from '@mui/material/Chip'

import { Product as ProductType } from './Products'
import { CurrencyContext } from '../App'

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: row;
  box-shadow: none;
` as typeof Card

const CardImage = styled(CardMedia)`
  padding: 50px;
  background-position: center center;
  object-fit: contain;
` as typeof CardMedia

const CardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
` as typeof Box

const CardTitle = styled(Typography)`
  color: #1976d2;
  font-weight: 900;
  line-height: 1.6rem;
  letter-spacing: 0.5px;
  padding: 10px 0;
` as typeof Typography

const ProductPrice = styled(Typography)`
  color: #1976d2;
  font-weight: 900;
  margin-top: 25px;
` as typeof Typography

const Product: FunctionComponent = () => {
  const { currency } = useContext(CurrencyContext)
  const { productId } = useParams()
  const { isLoading, error, data } = useQuery<ProductType, Error>({
    queryKey: [`product${productId}`],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${productId}`).then(res =>
        res.json()
      )
  })

  if (isLoading) return (<Typography>Loading...</Typography>)

  if (error) return (<Typography>An error has occurred: {error.message}</Typography>)

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={RouterLink} to="">
      Home
    </Link>,
    <Link
      component={RouterLink}
      underline="hover"
      key="2"
      color="inherit"
      to="/products"
    >
      Product
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ]

  return (
    <div>
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <ProductCard>
        <CardImage
          component="img"
          alt={data.title}
          height="400"
          image={data.image}
        />
        <CardBox>
          <CardContent>
            <CardTitle gutterBottom variant="h5" component="div">
              {data.title}
            </CardTitle>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
            <ProductPrice variant="h3" component="div">
              {currency} {data.price}
            </ProductPrice>
          </CardContent>
          <CardActions>
            <Chip label={data.category} color="primary" variant="outlined" />
          </CardActions>
        </CardBox>
      </ProductCard>
    </div>
  )
}

export default Product
