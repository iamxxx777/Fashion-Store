import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import Moment from 'react-moment'

// REDUX
import { UPDATE_ORDER_RESET } from '../../redux/constants/adminConstants'
import { getOrder } from '../../redux/actions/orderActions'
import { updateOrderStatus } from '../../redux/actions/adminActions'

// Components
import OrderItem from '../../components/Profile/OrderItem'
import Loader from '../../components/Loader/Loader'


// ICONS
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

// STYLES
import '../../styles/CustomerOrder.scss'


const Order = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const { loading, order, error } = useSelector((state) => state.order)
    const { updateLoading, update, updateError } = useSelector((state) => state.updateOrder)
    const [showOptions, setShowOptions] = useState(false)
    const [orderStatus, setOrderStatus] = useState(order?.status)
    const [deliveryDate, setDeliveryDate] = useState(order?.deliveryDate)

    const colorScheme = {
        delivered: '#27cf2f',
        pending: '#0F3460',
        cancelled: "#d60a2c",
        shipped: '#1e90ff'
    }

    const handleStatus = (value) => {
        dispatch(updateOrderStatus(id, { status: value }))
    }

    useEffect(() => {
        if(update && update.newStatus) {
            setOrderStatus(update.newStatus)
            if(update.deliveryDate) {
                setDeliveryDate(update.deliveryDate)
            }
            dispatch({type: UPDATE_ORDER_RESET})
        }

    }, [update, dispatch])

    useEffect(() => {
        dispatch(getOrder(id))
    }, [dispatch, id])

    if(loading) {
        return <div className="user_order"><Loader /></div>
    }

    if(error) {
        return <div className="user_order">{error}</div>
    }
    return (
        <div className='user_order order'>
            <div className="order_container">
                {updateError && <p style={{color: 'tomato'}}>{updateError}</p>}
                <div className="order_header">
                    <div className="order_title">
                        <button onClick={() => history.goBack()}> 
                            <ArrowBackOutlinedIcon />
                        </button>
                        <h1>Order Details</h1>
                    </div>
                    <div className="update">
                        <h3>Update Status: <span>{orderStatus || order.status} <button className={showOptions ? 'rotate' : null} onClick={() => setShowOptions(!showOptions)}><ArrowRightIcon /></button></span></h3>
                        {showOptions && <div className="options">
                            <button onClick={() => {handleStatus('pending'); setShowOptions(false)}}>Pending</button>
                            <button onClick={() => {handleStatus('cancelled'); setShowOptions(false)}}>Cancelled</button>
                            <button onClick={() => {handleStatus('shipped'); setShowOptions(false)}}>Shipped</button>
                            <button onClick={() => {handleStatus('delivered'); setShowOptions(false)}}>Delivered</button>
                        </div>}
                    </div>
                </div>
                {updateLoading && <Loader />}
                <div className="key_info">
                    <div className="order_key_info">
                        <div className="id">
                            <h2>Order No:</h2>
                            <h3>{order._id}</h3>
                        </div>
                        <div className="total_items">
                            <h2>Total Items:</h2>
                            <h3>{order.orderItems?.length}</h3>
                        </div>
                        <div className="date_placed">
                            <h2>Placed On:</h2>
                            <h3><Moment format="MMM DD, YYYY">{order.paymentDate}</Moment></h3>
                        </div>
                        <div className="price">
                            <h2>Total Price:</h2>
                            <h3>₦{order.totalPrice}</h3>
                        </div>
                        <div className="status">
                            <h2>Order Status:</h2>
                            <div className="status_div">
                                <span style={{backgroundColor: colorScheme[`${orderStatus || order.status}`]}}></span>
                                <h3 style={{color: colorScheme[`${orderStatus || order.status}`]}}>{orderStatus || order.status}</h3>
                            </div>
                        </div>
                        {order.deliveryDate && 
                            <div className="delivery">
                                <h2>Delivery Date:</h2>
                                <h3><Moment format="MMM DD, YYYY">{deliveryDate || order.deliveryDate}</Moment></h3>
                            </div>
                        }
                    </div>

                    <div className="customer">
                        <div className="container">
                            <h2>Customer</h2>
                            <div className="customer_info">
                                <h3><span>{order.user?.firstName}</span>
                                    <span>{order.user?.lastName}</span>
                                </h3>
                                <h3 className="email">{order.user?.email}</h3>
                                <h3>{order.user?.phone}</h3>
                                <Link to={`/admin/users/${order.user?._id}`}>View Customer</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order_items">
                    <h2>Order Items</h2>
                    <div className="items_container">
                        {order.orderItems?.map((item, i) => <OrderItem key={i} item={item} />)}
                    </div>
                </div>

                <div className="order_summary">
                    <div className="order_shipping">
                        <h2>Delivery Information</h2>
                        <div className="order_shipping_info">
                            <div className="method">
                                <h2>Shipping Method</h2>
                                <h3>Door Delivery</h3>
                            </div>
                            <div className="delivery_address">
                                <h3>Shipping Address</h3>
                                <div className="state">
                                    <h2>State:</h2>
                                    <h3>{order.shippingAddress?.state}</h3>
                                </div>
                                <div className="city">
                                    <h2>City:</h2>
                                    <h3>{order.shippingAddress?.city}</h3>
                                </div>
                                <div className="address">
                                    <h2>Address:</h2>
                                    <h3>{order.shippingAddress?.address}</h3>
                                </div>
                                <div className="address">
                                    <h2>Nearest Landmark:</h2>
                                    <h3>{order.shippingAddress?.landmark}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order_payment">
                        <h2>Payment Information</h2>
                        <div className="order_payment_info">
                            <div className="method">
                                <h2>Payment Method</h2>
                                <h3>Paystack</h3>
                            </div>
                            <div className="details">
                                <h3>Payment Details</h3>
                                <div className="detail">
                                    <h4>Items Total:</h4>
                                    <h5>₦{order.itemsPrice}</h5>
                                </div>
                                <div className="detail">
                                    <h4>Shipping Fee:</h4>
                                    <h5>₦{order.shippingFee}</h5>
                                </div>
                                <div className="detail">
                                    <h4>VAT:</h4>
                                    <h5>₦{order.taxFee}</h5>
                                </div>
                                <div className="detail">
                                    <h4>Total:</h4>
                                    <h5>₦{order.totalPrice}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order