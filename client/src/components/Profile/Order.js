import { Link, useHistory } from 'react-router-dom'
import Moment from 'react-moment'

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'

const Order = ({ order }) => {

    const colorScheme = {
        delivered: '#27cf2f',
        pending: '#0F3460',
        cancelled: "#d60a2c",
        shipped: '#1e90ff'
    }

    const history = useHistory()

    const click = () => {
        history.push(`/account/order/${order._id}`)
    }

    return (
        <Link to={`/account/order/${order._id}`}>
            <div className='user_order'>
                <div className="order_id">
                    <h3>{order._id}</h3>
                </div>
                <div className="order_date">
                    <h3><Moment format="MMM DD, YYYY">{order.paymentDate}</Moment></h3>
                </div>
                <div className="order_price">
                    <h3>₦{order.totalPrice}</h3>
                </div>
                <div className="order_total">
                    <h3>{order.orderItems.length}</h3>
                </div>
                <div className="order_status">
                    <span style={{backgroundColor: colorScheme[`${order.status}`]}}></span>
                    <h3 style={{color: colorScheme[`${order.status}`]}}>{order.status}</h3>
                </div>
                <div className="more_btn">
                    <button onClick={click}>
                        <ArrowCircleRightOutlinedIcon /> 
                    </button>
                </div>
            </div>
        </Link>
    )
}

export default Order