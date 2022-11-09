import { FunctionComponent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import { styled } from '@mui/material'

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const ProductsContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 20px;
  column-gap: 20px;
  row-gap: 50px;
` as typeof Box

const CardTitle = styled(Link)`
  color: #1976d2;
  font-weight: 900;
  line-height: 1.4rem;
  margin-bottom: 10px;
  display: block;
` as typeof Link

const CardDescription = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
` as typeof Typography

const CardBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
` as typeof Box

const ProductCard = styled(Card)`
  display: flex;
  flex-direction: column;
` as typeof Card

const Products: FunctionComponent = () => {
  const { isLoading, error, data } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: () =>
      fetch('https://fakestoreapi.com/products').then(res =>
        res.json()
      )
  })

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" component={RouterLink} to="/">
      Home
    </Link>,
    <Typography
      key="2"
      color="text.primary"
    >
      Products
    </Typography>,
  ]

  if (isLoading) return (<Typography>Loading...</Typography>)

  if (error) return (<Typography>An error has occurred: {error.message}</Typography>)

  return (
    <>
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <ProductsContainer>
        {
          data.map((row) => {
            return (
              <ProductCard sx={{ maxWidth: 345 }} key={row.id}>
                <RouterLink to={`/products/${row.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={row.image}
                    alt={row.title}
                  />
                </RouterLink>
                <CardBox>
                  <CardContent>
                    <CardTitle component={RouterLink} to={`/products/${row.id}`} key={row.id} underline="hover" variant="h6">
                      {row.title}
                    </CardTitle>
                    <CardDescription variant="body2" color="text.secondary">
                      {row.description}
                    </CardDescription>
                  </CardContent>
                  <CardActions>
                    <Chip label={row.category} color="primary" variant="outlined" />
                  </CardActions>
                </CardBox>
              </ProductCard>
            )
          })
        }
      </ProductsContainer>
    </>
  )
}

export default Products
