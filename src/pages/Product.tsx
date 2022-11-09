import { FunctionComponent, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Typography from '@mui/material/Typography'

import { Product as ProductType } from './Products'
import { CurrencyContext } from '../App'

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

  return (<div>Total for {productId}: {currency} {data.price}</div>)
}

export default Product
