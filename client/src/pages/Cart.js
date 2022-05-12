import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// REDUX ACTIONS
import { updateQty } from '../redux/actions/cartActions'

// COMPONENTS
import CartItem from "../components/Cart/CartItem"
import Layout from '../components/Layout/Layout'

// MUI ICONS
import RemoveShoppingCartIconOutlined from '@mui/icons-material/RemoveShoppingCart'

// STYLES
import '../styles/Cart.scss'

const Cart = () => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const totalItems = () => {
        let total = cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
        return total;
    }

    const totalPrice = () => {
        let total = cartItems.reduce((price, item) => (item.price * item.qty) + price, 0);
        return total;
    }

    const handleAdd = (item, unit) => {
        dispatch(updateQty(item, unit))
    }


    return (
        <Layout>
            <main className="cart">
                <div className="cart_container">
                    {cartItems.length === 0 && 
                        <div className="empty_cart">
                            <RemoveShoppingCartIconOutlined />
                            <h1>Your cart is empty. <Link to='/products'>Click here</Link> to shop some products</h1>
                        </div>
                    }
                    {
                        cartItems.length > 0 && 
                        <>
                            <h2 className="cart_header">Cart Items <span>({cartItems.length})</span></h2>
                            <div className="cart_items_info">
                                <div className="cart_items">
                                    {cartItems.map((item, i) => <CartItem key={i} updateQty={handleAdd} item={item}/>)}
                                </div>
                                <div className="cart_summary">
                                    <div className="cart_summary_container">
                                        <h3 className="summary">Cart Summary</h3>
                                        <div className="cart_summary_item">
                                            <h2>Total Items</h2>
                                            <h3>{totalItems()}</h3>
                                        </div>
                                        <div className="cart_summary_item">
                                            <h2>Total Price</h2>
                                            <h3>₦{totalPrice()}</h3>
                                        </div>
                                        <div className="cart_links">
                                            <Link to="/" className="continue">Continue Shopping</Link>
                                            <Link to="/checkout" className="checkout">Proceed To Checkout</Link>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </main>
        </Layout>
    )
}

export default Cart
