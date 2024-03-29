import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// REDUX ACTIONS
import { getProducts, getTopProducts } from '../redux/actions/productActions'

// COMPONENTS
import Layout from '../components/Layout/Layout'
import Jumbotron from '../components/Home/Jumbotron'
import LatestProducts from '../components/Home/LatestProducts'
import TopProductsSlide from '../components/Home/TopProductsSlide'
import FeaturedCategories from '../components/Home/FeaturedCategories'
import WhyUs from '../components/Home/WhyUs'
import NewsLetter from '../components/Home/NewsLetter'
import Loader from '../components/Loader/Loader'

// STYLES
import '../styles/Main.scss'

const Main = () => {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products)
    const { topProducts } = useSelector((state) => state.topProducts)

    useEffect(() => {
        setLoading(true)
        dispatch(getProducts())
        dispatch(getTopProducts())
        setLoading(false)
    }, [dispatch])

    if (loading) {
        return (
            <Loader />
        )
    }


    return (
        <Layout>
            <main className='main_page'>
                <div className="main_container">
                    <Jumbotron />
                    <TopProductsSlide products={topProducts} />
                    <LatestProducts products={products.products} />
                    <FeaturedCategories />
                    <WhyUs />
                    <NewsLetter />
                </div>
            </main>
        </Layout>
    )
};

export default Main;
