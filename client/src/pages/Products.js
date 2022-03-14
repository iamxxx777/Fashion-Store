import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { getProducts } from "../redux/actions/productActions"

import SearchTitle from '../components/Search/SearchTitle'
import Paginate from '../components/Pagination/Paginate'
import ProductCard from '../components/Products/ProductCard'

import "../styles/ProductsPage.scss"

const Products = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const history = useHistory()

    const page = params.pageNumber || 1
    const keyword = params.keyword || ""
    
    const { products: { pages, pageNumber, products, count }, loading, error } = useSelector((state) => state.products)
    
    const paginatePage = async (value) => {
        if(keyword) {
            history.push(`/products/${keyword}/page/${value}`)
        } else {
            history.push(`/products/page/${value}`)
        }
    }

    useEffect(() => {
        dispatch(getProducts(keyword, page))
    }, [dispatch, keyword, page])

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
                {keyword ? (<SearchTitle keyword={keyword} totalNumber={count} />) : (<h1>All Products</h1>)}
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