import React from 'react'
import { Link } from 'react-router-dom'

const OrderItem = () => {
  return (
    <div className="order_item">
        <div className="order_item_img">
            <img src="https://res.cloudinary.com/hopetomiwa/image/upload/v1643146074/Store/Gown_black_remove_qghjoh.png" alt="Slim patterned party gown" />
        </div>
        <div className="order_item_info">
            <h2>Slim Black Sleevless Gown</h2>
            <h3>QTY: <span>2</span></h3>
            <h4>Price: <span>₦14,750</span></h4>
            <Link to="/products">Buy Again</Link>
        </div>
    </div>
  )
}

export default OrderItem