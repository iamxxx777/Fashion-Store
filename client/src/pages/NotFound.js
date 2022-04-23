import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Components
import ProductCard from '../components/Products/ProductCard'
import Loader from '../components/Loader/Loader'
import Layout from '../components/Layout/Layout'

// 404 Image
import Image from '../assets/404.svg'

// Redux actions
import { getTopProducts } from '../redux/actions/productActions'

// Style
import '../styles/NotFound.scss'

const NotFound = () => {

    const dispatch = useDispatch()
    const { topProducts, loading, error } = useSelector((state) => state.topProducts)

    useEffect(() => {
        dispatch(getTopProducts())
    }, [dispatch])

    if(loading) {
        return <Layout><main className="not_found"> <Loader /> </main></Layout>
    }

    if (error) {
        return <Layout><main className="not_found">{error}</main></Layout>
    }

    return (
        <Layout>
            <main className='not_found'>
                <div className="container">
                    <div className="error_div">
                        <div className="image">
                            <img src={Image} alt="Not found" />
                        </div>
                        <div className="text">
                            <h1>Oops 404 Error</h1>
                            <h2>Don't you just hate when this happens?</h2>
                            <p>
                                The page you are looking for does not exist or it might have been removed by the administrator.
                                Now don't fret, just checkout some of the items below and continue shopping.
                            </p>
                        </div>
                    </div>
                    <div className="items">
                        <h2>Top Products</h2>
                        <div className="items_container">
                            {topProducts?.map((product) => <ProductCard key={product._id} product={product} />)}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default NotFound