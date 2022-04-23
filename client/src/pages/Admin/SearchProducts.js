import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { useAlert } from 'react-alert'
import queryString from 'query-string'

// REDUX ACTIONS
import { deleteProduct, getProducts } from '../../redux/actions/productActions'
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants'


// COMPONENTS
import SearchTitle from '../../components/Admin/SearchTitle'
import Paginate from '../../components/Pagination/Paginate'
import AdminProduct from '../../components/Admin/AdminProduct'
import Loader from '../../components/Loader/Loader'

// STYLE
import '../../styles/AllProducts.scss'


const SearchProducts = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const location = useLocation()
    const alert = useAlert()

    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState("")
    const [sortKey, setSortKey] = useState("")
    const [sortValue, setSortValue] = useState("")

    const { products: { pages, pageNumber, products, count }, loading, error } = useSelector((state) => state.products)
    const { delProduct, loading: delLoading, error: delError } = useSelector((state) => state.deleteProduct)

    const deleteProductItem = async (id, name) => {
        try {
            if(window.confirm(`Delete ${name}`)) {
                dispatch(deleteProduct(id))
            }
        } catch (error) {
            alert.error(error)
        }
        
    }

    const handleSorting = (key, value) => {
        setSortKey(key)
        setSortValue(value)

        history.push(`/admin/search/?keyword=${keyword}&page=${pageNumber}&sortKey=${key}&sortValue=${value}`)
    }

    const paginatePage = (value) => {
        if(sortKey) {
            history.push(`/admin/search/?keyword=${keyword}&page=${value}&sortKey=${sortKey}&sortValue=${sortValue}`)
        } else {
            history.push(`/admin/search/?keyword=${keyword}&page=${value}`)
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
        const { sortKey, sortValue, page, keyword } = queryString.parse(location.search)
        setSortKey(sortKey)
        setSortValue(sortValue)
        setPage(page)
        setKeyword(keyword)
    }, [location.search])

    // FETCH PRODUCTS
    useEffect(() => {
        if(keyword) {
            dispatch(getProducts(keyword, page, sortKey, sortValue))
        }
    }, [dispatch, keyword, page, sortKey, sortValue])


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
                    <SearchTitle keyword={keyword} totalNumber={count} sort={handleSorting} sortKey={sortKey} />
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

export default SearchProducts