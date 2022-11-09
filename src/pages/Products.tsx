import { FunctionComponent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'

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
      <ul>
        {
          data.map((row) => {
            return (
              <li key={row.id}>
                <RouterLink to={`/products/${row.id}`}>{row.title}</RouterLink>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

export default Products
