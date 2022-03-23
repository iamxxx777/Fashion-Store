import { useState } from 'react'

const ProductTypeItem = ({ handleCart, handleRemove, cartItems, item, size }) => {

    const itemExistInCart = cartItems.find((cartItem) => cartItem.size === size.name)

    const [qty, setQty] = useState(itemExistInCart ? itemExistInCart.qty : 0)

    const handleAdd = () => {
        setQty(qty => qty + 1)
        handleCart(item._id, qty + 1, size.name, size.count)
    }

    const handleSubtract = () => {
        if(qty === 1) {
            setQty(qty => qty - 1)
            handleRemove(item._id, size.name)
        } else {
            setQty(qty => qty - 1)
            handleCart(item._id, qty - 1, size.name, size.count)
        }
    }


    return (
        <div className="type_item">
            <div className="type_item_name">
                <h2>{size.name}</h2>
                <h3>₦{item.price}</h3>
            </div>
            <div className="type_item_btns">
                <div>
                    <button
                        className='type_left'
                        disabled={qty === 0 ? true : false} 
                        onClick={handleSubtract}
                    >-</button>
                    <p>{qty}</p>
                    <button
                        className='type_left'
                        disabled={qty === size.count ? true : false} 
                        onClick={handleAdd}
                    >+</button>
                </div>
            </div>
        </div>
    )
}

export default ProductTypeItem
