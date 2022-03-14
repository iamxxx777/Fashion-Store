import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProducts } from "../redux/actions/productActions"

import Paginate from '../components/Pagination/Paginate'
import Product from '../components/Products/Product'

import "../styles/Home.css"

const Home = () => {

  const dispatch = useDispatch()

  const { products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])


  return (
    <div>

      <h1>Index Page</h1>
      {
        loading ? <h1>Loading...</h1> :
        error ? <h1>Error</h1> : 
        <div className='grid'>
          {products.products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}

          <Paginate pages={products.pages} pageNumber={products.pageNumber} />
        </div>
      }

    </div>
  )
}

export default Home
