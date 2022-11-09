import { FunctionComponent } from 'react'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'

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

  if (!data) return null

  return (
    <ul>
      {
        data.map((row: any) => {
          return (
            <li key={row.id}>{row.title}</li>
          )
        })
      }
    </ul>
  )
}

export default Products
