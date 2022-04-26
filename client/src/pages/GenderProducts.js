import { useEffect, useState } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string'

// COMPONENTS
import CategoryTopProducts from '../components/Category/CategoryTopProducts';
import Paginate from '../components/Pagination/Paginate'
import ProductCard from '../components/Products/ProductCard'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import SearchTitle from '../components/Search/SearchTitle'

// REDUX ACTIONS
import { getGenderProducts } from '../redux/actions/productActions'

// STYLES
import '../styles/CategoryPage.scss'

const GenderProducts = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const params = useParams()
    const page = params.pageNumber || 1
    const gender = params.gender.replace(/-/g, ' ') // if gender contains dashes, change it to a whitespace
    
    const [sortKey, setSortKey] = useState("")
    const [sortValue, setSortValue] = useState("")

    const { genderProducts : { products, pages, count, pageNumber }, loading, error } = useSelector((state) => state.genderProducts)

    const paginatePage = async (value) => {
        if(sortKey) {
            history.push(`/gender/${gender}/page/${value}?sortKey=${sortKey}&sortValue=${sortValue}`)
        } else {
            history.push(`/gender/${gender}/page/${value}`)
        }
    }

    const handleSorting = (key, value) => {
        setSortKey(key)
        setSortValue(value)

        history.push(`/gender/${gender}/page/${pageNumber}?sortKey=${key}&sortValue=${value}`)
    }

    // GET QUERY STRINGS FROM URL
    useEffect(() => {
        const { sortKey, sortValue } = queryString.parse(location.search)
        setSortKey(sortKey)
        setSortValue(sortValue)
    }, [location.search])

    // FETCH GENDER SPECIFIC PRODUCTS
    useEffect(() => {
        dispatch(getGenderProducts(gender, page, sortKey, sortValue))
    }, [dispatch, page, gender, sortKey, sortValue])


    if(loading) {
        return <Layout><main className="category_page"> <Loader /> </main></Layout>
    }

    if(error) {
        return <Layout>
            <main className="category_page">{error}</main>
        </Layout>
    }


    return (
        <Layout>
            <main className="category_page">
                <div className="category_page_container">
                    <SearchTitle keyword={gender} totalNumber={count} sort={handleSorting} sortKey={sortKey} />
                    <CategoryTopProducts products={products?.slice(0, 4)} />
                    <section className="category_products">
                        <h1>All Products</h1>
                        <div className="products">
                            {products?.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                        <Paginate pages={pages} pageNumber={pageNumber} click={paginatePage} />
                    </section>
                </div>
            </main>
        </Layout>
    )
}

export default GenderProducts