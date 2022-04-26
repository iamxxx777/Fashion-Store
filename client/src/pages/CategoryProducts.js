import { useState, useEffect } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string'

// COMPONENTS
import CategoryTopProducts from '../components/Category/CategoryTopProducts'
import Paginate from '../components/Pagination/Paginate'
import ProductCard from '../components/Products/ProductCard'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'
import SearchTitle from '../components/Search/SearchTitle'

// REDUX ACTIONS
import { getCategoryProducts } from '../redux/actions/productActions'

// STYLES
import '../styles/CategoryPage.scss'

const CategoryProducts = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()

    const params = useParams()
    const page = params.pageNumber || 1
    const category = params.category.replace(/-/g, " ")  // if params contains dashes, change it to a whitespace
    
    const [sortKey, setSortKey] = useState("")
    const [sortValue, setSortValue] = useState("")

    const { categoryProducts: { products, pages, count, pageNumber }, loading, error } = useSelector((state) => state.categoryProducts)

    const paginatePage = async (value) => {
        history.push(`/category/${category}/page/${value}`)
    }

    const handleSorting = (key, value) => {
        setSortKey(key)
        setSortValue(value)

        history.push(`/category/${category}/page/${pageNumber}?sortKey=${key}&sortValue=${value}`)
    }

    // GET QUERY STRINGS FROM URL
    useEffect(() => {
        const { sortKey, sortValue } = queryString.parse(location.search)
        setSortKey(sortKey)
        setSortValue(sortValue)
    }, [location.search])

    // GET CATEGORY PRODUCTS
    useEffect(() => {
        dispatch(getCategoryProducts(category, page, sortKey, sortValue))
    }, [dispatch, page, category, sortKey, sortValue])

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
                    <SearchTitle keyword={category} totalNumber={count} sort={handleSorting} sortKey={sortKey} />
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

export default CategoryProducts;
