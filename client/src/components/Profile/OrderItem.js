import React from 'react'
import { Link } from 'react-router-dom'

const OrderItem = ({ item }) => {
  return (
    <div className="order_item">
        <div className="order_item_img">
            <img src={item.images[0].url} alt={item.name} />
        </div>
        <div className="order_item_info">
            <h2>{item.name}</h2>
            <h3>QTY: <span>{item.qty}</span></h3>
            <h4>Price: <span>₦{item.price}</span></h4>
            <Link to={`/product/{item._id}`}>Buy Again</Link>
        </div>
    </div>
  )
}

export default OrderItem