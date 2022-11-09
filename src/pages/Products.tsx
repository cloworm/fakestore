import { FunctionComponent } from 'react'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'

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

  if (isLoading) return (<Typography>Loading...</Typography>)

  if (error) return (<Typography>An error has occurred: {error.message}</Typography>)

  return (
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
  )
}

export default Products
