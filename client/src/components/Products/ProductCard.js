import React from 'react'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'

import '../../styles/ProductCard.scss'

const ProductCard = ({ product }) => {
  return (
      <div className="product_card">
        <Link to={`/product/${product._id}`}>
        <div className="product_card_container">
            <div className="product_card_img">
                <img src={product.images[0].url} alt={product.name} />
            </div>
            <div className="product_card_info">
                <h2>{product.name.length > 30 ? `${product.name.substring(0, 30)}...` : product.name}</h2>
                <Ratings value={product.ratings} />
                <h3>₦{product.price}</h3>
            </div>
        </div>
        </Link>
      </div>
    )
};

export default ProductCard;
