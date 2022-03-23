import React from 'react'
import { Link } from 'react-router-dom'
import ProductTypeItem from './ProductTypeItem'

import '../../styles/ProductType.scss'

const ProductTypeSelect = ({ data, item, cartItems, handleCart, handleRemove, close }) => {
    
    return (
        <div className='product_type'>
            <div className="type_container">
                <div className="type_header">
                    <h3>Please select a variation</h3>
                    <button className="type_close" onClick={close}>&#10006;</button>
                </div>
                <div className="type_items">
                    {data?.filter((size) => size.count > 1).map((size, i) => 
                        (<ProductTypeItem 
                            key={i}
                            size={size} 
                            item={item} 
                            handleCart={handleCart}
                            handleRemove={handleRemove}
                            cartItems={cartItems}
                        />)
                    )}
                </div>
                <div className="product_type_buttons">
                    <button className='continue_btn' onClick={close}>Continue shopping</button>
                    <button className='cart_btn'><Link to="/cart">View Cart</Link></button>
                </div>
            </div>
        </div>
    )
}

export default ProductTypeSelect
