import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { removeFromCart } from '../../redux/actions/cartActions'

import DeleteIcon from '@mui/icons-material/Delete'

import '../../styles/CartItem.scss'

const Cartitem = ({ item, updateQty }) => {
    const dispatch = useDispatch()

    const [qty, setQty] = useState(item.latestCount ? item.latestCount : item.qty)

    const handleRemove = () => {
        dispatch(removeFromCart(item.product, item.size))
    }

    const handleDecrease = () => {
        if (qty > 1) {
            setQty(qty => qty - 1)
            updateQty(item, qty - 1)
        }
    }

    const handleIncrease = () => {
        if(item.latestCount) {
            if (qty < item.latestCount) {
                setQty(qty => qty + 1)
                updateQty(item, qty + 1)
            }
        } else {
            if (qty < item.countInStock) {
                setQty(qty => qty + 1)
                updateQty(item, qty + 1)
            }
        }
    }

    
    return (
        <div className="cart_item">
            <div className="item_img">
                <img src={item.images ? item.images[0].url : null} className="cart_image" alt={item.name} />
            </div>
            <div className="item_info">
                <div className="item_details">
                    <h2 className="name">{item.name}</h2>
                    <h3 className="size">Size: {item.size}</h3>
                    <p className="unit">₦{item.price} x {item.qty}</p>
                    <h3 className='price'>₦{item.price * Number(qty)}</h3>
                </div>
                <div className="item_buttons">
                    <div className="buttons">
                        <button 
                            onClick={handleDecrease}
                            disabled={qty <= 1 ? true : false}
                        >-</button>
                        <span>{qty}</span>
                        <button 
                            disabled={qty === item.count ? true : false}
                            onClick={handleIncrease}
                        >+</button>
                    </div>  
                </div>
            </div>
            <button className="close" onClick={handleRemove}><DeleteIcon /></button>
        </div>
    )
}

export default Cartitem