import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// COMPONENTS
import CategoryTopProducts from '../components/Category/CategoryTopProducts';
import Paginate from '../components/Pagination/Paginate'
import ProductCard from '../components/Products/ProductCard'
import Layout from '../components/Layout/Layout'
import Loader from '../components/Loader/Loader'

// REDUX ACTIONS
import { getCategoryProducts } from '../redux/actions/productActions'

// STYLES
import '../styles/CategoryPage.scss'

const CategoryPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const params = useParams()
    const page = params.pageNumber || 1
    const category = params.category

    const { categoryProducts, loading, error } = useSelector((state) => state.categoryProducts)
    const { products, pages, pageNumber } = categoryProducts

    const paginatePage = async (value) => {
        history.push(`/category/${category}/page/${value}`)
    }

    useEffect(() => {
        dispatch(getCategoryProducts(category, page))
    }, [dispatch, page, category])

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
};

export default CategoryPage;
