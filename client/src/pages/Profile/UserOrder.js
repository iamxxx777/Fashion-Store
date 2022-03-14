// import { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

// import { getOrder } from '../../redux/actions/orderActions'

// Components
import OrderItem from '../../components/Profile/OrderItem'

// ICONS
import MenuIcon from '@mui/icons-material/Menu'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'

import '../../styles/CustomerOrder.scss'

const UserOrder = ({ click }) => {

  // const { id } = useParams()
  // const dispatch = useDispatch()
  const history = useHistory()

  // useEffect(() => {
  //   dispatch(getOrder(id))
  // }, [dispatch, id])

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
                <h3>61c8e3d291f8e54b19f922d6</h3>
              </div>
              <div className="total_items">
                <h2>Total Items:</h2>
                <h3>3</h3>
              </div>
              <div className="date_placed">
                <h2>Placed On:</h2>
                <h3>Jun 15, 2022</h3>
              </div>
              <div className="price">
                <h2>Total Price:</h2>
                <h3>₦124,570</h3>
              </div>
            </div>

            <div className="order_items">
              <h2>Order Items</h2>
              <div className="items_container">
                <OrderItem />
                <OrderItem />
                <OrderItem />
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
                      <h3>Oyo</h3>
                    </div>
                    <div className="city">
                      <h2>City:</h2>
                      <h3>Ibadan</h3>
                    </div>
                    <div className="address">
                      <h2>Address:</h2>
                      <h3>Dalemo junction, Bembo Road, Apata, Ibadan</h3>
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
                      <h5>₦140,750</h5>
                    </div>
                    <div className="detail">
                      <h4>Shipping Fee:</h4>
                      <h5>₦1050</h5>
                    </div>
                    <div className="detail">
                      <h4>VAT:</h4>
                      <h5>₦3650</h5>
                    </div>
                    <div className="detail">
                      <h4>Total:</h4>
                      <h5>₦145,250</h5>
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