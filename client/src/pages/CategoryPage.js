import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CategoryTopProducts from '../components/Category/CategoryTopProducts';
import Paginate from '../components/Pagination/Paginate'
import ProductCard from '../components/Products/ProductCard'

import { getCategoryProducts } from '../redux/actions/productActions'

import '../styles/CategoryPage.scss'

const CategoryPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const params = useParams()
    const page = params.pageNumber || 1
    const category = params.category

    const { categoryProducts } = useSelector((state) => state.categoryProducts)
    const { products, pages, pageNumber } = categoryProducts

    const paginatePage = async (value) => {
        history.push(`/category/${category}/page/${value}`)
    }

    useEffect(() => {
        dispatch(getCategoryProducts(category, page))
    }, [dispatch, page, category])


    return (
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
    )
};

export default CategoryPage;
