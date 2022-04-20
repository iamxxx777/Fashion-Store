import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

// REDUX ACTIONS
import { getAdminProducts } from "../../redux/actions/adminActions"
import { deleteProduct } from '../../redux/actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants'

// COMPONENTS
import ProductsTitle from '../../components/Admin/ProductsTitle'
import Paginate from '../../components/Pagination/Paginate'
import AdminProduct from '../../components/Admin/AdminProduct'
import Loader from '../../components/Loader/Loader'

// STYLES
import '../../styles/AllProducts.scss'

const AllProducts = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const location = useLocation()

    const page = params.pageNumber || 1
    const keyword = params.keyword || ""

    const [filterKey, setFilterKey] = useState("")
    const [sortKey, setSortKey] = useState("")
    const [sortValue, setSortValue] = useState("")

    const { products: { pages, pageNumber, products, count }, loading, error } = useSelector((state) => state.adminProducts)
    const { delProduct, loading: delLoading, error: delError } = useSelector((state) => state.deleteProduct)

    const handleSorting = (key, value) => {
        setSortKey(key)
        setSortValue(value)

        if(keyword) {
            history.push(`/admin/search/${keyword}/${pageNumber}?sortKey=${key}&sortValue=${value}&filterKey=${filterKey}`)
        } else {
            history.push(`/admin/products/${pageNumber}?sortKey=${key}&sortValue=${value}&filterKey=${filterKey}`)
        }
    }

    const handleFilter = (value) => {
        setFilterKey(value)

        history.push(`/admin/products/${pageNumber}?sortKey=${sortKey}&sortValue=${sortValue}&filterKey=${value}`)
    }

    const paginatePage = (value) => {
        if(keyword) {
            if(sortKey) {
                history.push(`/admin/search/${keyword}/${value}?sortKey=${sortKey}&sortValue=${sortValue}&filterKey=${filterKey}`)
            } else {
                history.push(`/admin/search/${keyword}/${value}`)
            }
        } else {
            if(sortKey) {
                history.push(`/admin/products/${value}?sortKey=${sortKey}&sortValue=${sortValue}&filterKey=${filterKey}`)
            } else {
                history.push(`/admin/products/${value}`)
            }
        }
    }

    const deleteProductItem = async (id) => {
        try {
            if(window.confirm('Delete this product')) {
                dispatch(deleteProduct(id))
            }
        } catch (error) {
            alert.error(error)
        }
        
    }

    // HANDLE PRODUCT DELETE ACTIONS
    useEffect(() => {
        if(delProduct && delProduct.success) {
            alert.success('Product Deleted Successfully')
            dispatch({ type: DELETE_PRODUCT_RESET })
            window.location.reload()
        }

        if(delProduct && delProduct.message) {
            alert.error(delProduct.message)
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
    }, [delProduct, dispatch, alert])

    // GET QUERY STRINGS FROM URL
    useEffect(() => {
        let { sortKey, sortValue, filterKey } = queryString.parse(location.search)

        if(sortKey === 'undefined') sortKey = ''
        if(sortValue === 'undefined') sortValue = ''
        if(filterKey === 'undefined') filterKey = ''

        setSortKey(sortKey)
        setSortValue(sortValue)
        setFilterKey(filterKey)
    }, [location.search])

    // FETCH PRODUCTS
    useEffect(() => {
        dispatch(getAdminProducts(page, sortKey, sortValue, filterKey))
    }, [dispatch, page, sortKey, sortValue, filterKey])


    if(loading) {
        return (
            <main className="allproducts">
                <Loader />
            </main>
        )
    }

    if(error) {
        return (
            <main className="allproducts">
                <h1>{error}</h1>
            </main>
        )
    }

    return (
        <div className='allproducts'>
            <div className="container">
                {delError && <p className="error">{delError}</p>}
                <section className="title_section">
                    <ProductsTitle sort={handleSorting} sortKey={sortKey} filter={handleFilter} filterKey={filterKey} keyword={keyword} />
                </section>
                <section className="products_section">
                    <div className="products_box">
                        {products?.map((product) => (
                            <AdminProduct key={product._id} product={product} deleteItem={deleteProductItem} />
                        ))}
                    </div>
                </section>
                <section className="pagination">
                    <div className="orders_total">
                        <h3>{count} products total</h3>
                    </div>
                    <Paginate pages={pages} pageNumber={pageNumber} click={paginatePage} />
                </section>
                {delLoading && <Loader />}
            </div>
        </div>
    )
}

export default AllProducts