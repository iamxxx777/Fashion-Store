import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Moment from 'react-moment'

import { getOrder } from '../../redux/actions/orderActions'

// Components
import OrderItem from '../../components/Profile/OrderItem'
import Loader from '../../components/Loader/Loader'

// ICONS
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import '../../styles/CustomerOrder.scss'

const UserOrder = ({ click }) => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, order, error } = useSelector((state) => state.order)

  const colorScheme = {
    delivered: '#27cf2f',
    pending: '#0F3460',
    cancelled: "#d60a2c",
    shipped: '#1e90ff'
  }

  useEffect(() => {
    dispatch(getOrder(id))
  }, [dispatch, id])

  if(loading) {
    return <section className="user_order"><Loader /></section>
  }

  if(error) {
    return <section className="user_order">{error}</section>
  }

  return (
    <section className="user_order">
        <div className="order_container">
            <div className="order_header">
              <div className="order_title">
                <button onClick={() => history.goBack()}> 
                  <ArrowBackOutlinedIcon />
                </button>
                <h1>Order Details</h1>
              </div>
              <div className="mb_btn">
                <button onClick={click}> <MenuIcon /> </button>
              </div>
            </div>

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
                  <span style={{backgroundColor: colorScheme[`${order.status}`]}}></span>
                  <h3 style={{color: colorScheme[`${order.status}`]}}>{order.status}</h3>
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
    </section>
  )
}

export default UserOrder