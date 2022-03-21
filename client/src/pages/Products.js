import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { getProducts } from "../redux/actions/productActions"

import SearchTitle from '../components/Search/SearchTitle'
import Paginate from '../components/Pagination/Paginate'
import ProductCard from '../components/Products/ProductCard'

import "../styles/ProductsPage.scss"

const Products = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()
    const location = useLocation()

    const page = params.pageNumber || 1
    const keyword = params.keyword || ""

    const [sortKey, setSortKey] = useState("")
    const [sortValue, setSortValue] = useState("")
    
    const { products: { pages, pageNumber, products, count }, loading, error } = useSelector((state) => state.products)

    const handleSorting = (key, value) => {
        setSortKey(key)
        setSortValue(value)

        if(keyword) {
            history.push(`/search/${keyword}/page/${pageNumber}?sortKey=${key}&sortValue=${value}`)
        } else {
            history.push(`/products/page/${pageNumber}?sortKey=${key}&sortValue=${value}`)
        }
    }

    const paginatePage = (value) => {
        if(keyword) {
            history.push(`/search/${keyword}/page/${value}?sortKey=${sortKey}&sortValue=${sortValue}`)
        } else {
            history.push(`/products/page/${value}?sortKey=${sortKey}&sortValue=${sortValue}`)
        }
    }

    // GET QUERY STRINGS FROM URL
    useEffect(() => {
        const { sortKey, sortValue } = queryString.parse(location.search)
        setSortKey(sortKey)
        setSortValue(sortValue)
    }, [location.search])

    // FETCH PRODUCTS
    useEffect(() => {
        dispatch(getProducts(keyword, page, sortKey, sortValue))
    }, [dispatch, keyword, page, sortKey, sortValue])

    if(loading) {
        return (
            <main className="products_page">
                <h1>Loading...</h1>
            </main>
        )
    }

    if(error) {
        return (
            <main className="products_page">
                <h1>{error}</h1>
            </main>
        )
    }

  return (
    <main className="products_page">
        <div className="products_container">
            <section className="products_header">
                <SearchTitle keyword={keyword} totalNumber={count} sort={handleSorting} sortKey={sortKey} />
            </section>
            <section className="products">
                <div className="products_box">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </section>
            <section className="pagination">
                <Paginate pages={pages} pageNumber={pageNumber} click={paginatePage} />
            </section>
        </div>
    </main>
  )
}

export default Products