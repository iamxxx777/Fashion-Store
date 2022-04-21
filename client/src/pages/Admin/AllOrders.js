import { useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import queryString from 'query-string'


// REDUX ACTIONS
import { getOrders } from '../../redux/actions/adminActions'

// COMPONENTS
import OrderItem from '../../components/Admin/OrderItem'
import Paginate from '../../components/Pagination/Paginate'
import Loader from '../../components/Loader/Loader'


// ICONS
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

// STYLES
import '../../styles/AllOrders.scss'


const AllOrders = () => {

    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const alert = useAlert()

    const query = queryString.parse(location.search)

    const [showOptions, setShowOptions] = useState(false)
    
    const keyword = query.keyword || ""
    const page = params.page || 1

    const dispatch = useDispatch()

    const { orders: { pages, pageNumber, orders, count }, loading, error } = useSelector((state) => state.adminOrders)

    const handleFilter = (value) => {
        history.push(`/admin/orders?keyword=${value}&pageNumber=${page}`)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        const value = e.target.search.value

        if(!value) {
            alert('enter an id to search')
        } else if (value.length !== 24 ) {
            alert('ID must be 24 characters')
        } else {
            history.push(`/admin/order/${value}`)
        }

        e.target.search.value = ""
    }

    const paginatePage = (value) => {
        if(keyword) {
            history.push(`/admin/orders/page/${value}?keyword=${keyword}`)
        } else {
            history.push(`/admin/orders/page/${value}`)
        }
    }

    useEffect(() => {
        dispatch(getOrders(keyword, page))
    }, [dispatch, keyword, page])

    if(loading) {
        return (
            <div className="allorders">
                <Loader />
            </div>
        )
    }

    if(error) {
        return (
            <div className="allorders">
                <h1>{error}</h1>
            </div>
        )
    }

    return (
        <div className='allorders'>
            <div className="container">
                <section className="title">
                    <h1>All Orders</h1>
                </section>
                <section className="search_bar">
                    <form className="search" onSubmit={handleSearch}>
                        <input type="text" name="search" placeholder='Search by orderId' />
                        <button><SearchOutlinedIcon /></button>
                    </form>
                    <div className="sort">
                        <h3>Filter: <span>{keyword || 'All'} <button className={showOptions ? 'rotate' : null} onClick={() => setShowOptions(!showOptions)}><ArrowRightIcon /></button></span></h3>
                        {showOptions && <div className="options">
                            <button onClick={() => {handleFilter(''); setShowOptions(false)}}>All</button>
                            <button onClick={() => {handleFilter('pending'); setShowOptions(false)}}>Pending</button>
                            <button onClick={() => {handleFilter('cancelled'); setShowOptions(false)}}>Cancelled</button>
                            <button onClick={() => {handleFilter('shipped'); setShowOptions(false)}}>Shipped</button>
                            <button onClick={() => {handleFilter('delivered'); setShowOptions(false)}}>Delivered</button>
                        </div>}
                    </div>
                </section>
                <section className="orders_section">
                    <div className="container">
                        <div className="title">
                            <h3>ID</h3>
                            <h3>Name</h3>
                            <h3>Email</h3>
                            <h3>Date</h3>
                            <h3>Price</h3>
                            <h3>Status</h3>
                            <h3>View</h3>
                        </div>
                        <div className="orders">
                            {orders?.map((order) => <OrderItem key={order._id} order={order} />)}
                        </div>
                    </div>
                </section>
                <section className="pagination">
                    <div className="orders_total">
                        <h3>{count} orders total</h3>
                    </div>
                    <Paginate pages={pages} pageNumber={pageNumber} click={paginatePage} />
                </section>
            </div>
        </div>
    )
}

export default AllOrders