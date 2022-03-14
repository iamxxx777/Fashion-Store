import React from 'react'
import { Link } from 'react-router-dom'

import Ratings from './Ratings'

import '../../styles/NewProduct.scss'

const NewProduct = ({ product, ratings }) => {
    return (
        <div className='new_product'>
            <Link to={`/product/${product._id}`}>
                <div className="new_product_container">
                    <div className="new_product_img">
                        <img src={product.images[0].url} alt={product.name} />
                    </div>
                    <div className="new_product_info">
                        <h2>{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h2>
                        {ratings && <Ratings value={ratings} />}
                        <h3>₦{product.price}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default NewProduct
