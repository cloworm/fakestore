import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

const Product: FunctionComponent = () => {
  const { productId } = useParams()

  return (<div>{productId}</div>)
}

export default Product
