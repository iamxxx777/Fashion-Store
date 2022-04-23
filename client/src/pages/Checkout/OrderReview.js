import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// MUI COMPONENTS
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

// REDUX ACTIONS
import { confirmOrderItems } from '../../redux/actions/cartActions'
import { updateQty } from '../../redux/actions/cartActions'

// COMPONENTS
import Cartitem from '../../components/Cart/CartItem'
import CustomizedSteps from '../../components/Checkout/CustomizedSteps'
import Loader from '../../components/Loader/Loader'
import Layout from '../../components/Layout/Layout'

// STYLE
import '../../styles/Checkout.scss'

const OrderReview = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(confirmOrderItems())
    }, [dispatch])   

    const { orderItems, loading, error } = useSelector((state) => state.orderItems)
    const changedItems = orderItems.filter((item) => item.previousCount)

    const totalItems = () => {
        let total = orderItems.reduce((qty, item) => Number(item.qty) + qty, 0);
        return total;
    }

    const shipping = 1000

    const totalItemsPrice = () => {
        let total = orderItems.reduce((price, item) => (item.price * item.qty) + price, 0)
        return total;
    }

    const vat = () => {
        let tax = (totalItemsPrice() * 3) / 100
        return tax
    }

    const totalPrice = () => {
        let total = totalItemsPrice() + shipping + vat()
        return total;
    }

    const handleAdd = (item, unit) => {
        dispatch(updateQty(item, unit))
    }
     
    if (loading) {
        return <Layout> <main className="order_review"> <Loader /> </main></Layout>
    }

    if (error) {
        return (
            <Layout>
                <main className="order_review"><h1>{error}</h1></main>
            </Layout>
        )
    }

    return (
        <Layout>
            <main className="order_review">
                <CustomizedSteps activeStep={1} />
                <div className="order_review_container">
                    <section className="order_details">
                        <div className="order_errors">
                            {changedItems?.map((item) => (
                                <h2>{`<b>${item.name}</b> of size <b>${item.size}</b> has only <b>${item.qty}</b> pieces left. Quantity has been adjusted in your cart`}</h2>
                            ))}
                            {changedItems.length === 0 && <h1>All items are valid</h1>}
                        </div>

                        <div className="order_items">
                            {orderItems.map((item, i) => <Cartitem key={i} item={item} updateQty={handleAdd} />)}
                        </div>
                    </section>

                    <section className="order_summary">
                        <div className="order_summary_container">
                            <div className="order_summary_item">
                                <h2>Total Items</h2>
                                <h3>{totalItems()}</h3>
                            </div>
                            <div className="order_summary_item">
                                <h2>Items price</h2>
                                <h3>₦{totalItemsPrice()}</h3>
                            </div>
                            <div className="order_summary_item">
                                <h2>VAT</h2>
                                <h3>₦{vat()}</h3>
                            </div>
                            <div className="order_summary_item">
                                <h2>Shipping (Standard)</h2>
                                <h3>₦{shipping}</h3>
                            </div>
                            <div className="order_summary_item">
                                <h2>Total Price</h2>
                                <h3>₦{totalPrice()}</h3>
                            </div>
                            <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 1, '& button': { width: "100%" } }} >
                                <Grid item xs={12} sm={6} md={12}>
                                    <Button size="large" variant="outlined"><Link to="/checkout">Back</Link></Button>
                                </Grid>
                                <Grid item xs={12} sm={6} md={12}>
                                    <Button size="large" variant="contained"><Link to="/checkout/payment">Proceed to payment</Link></Button>
                                </Grid>    
                            </Grid>
                        </div>
                    </section>
                </div>
            </main>
        </Layout>
    )
}

export default OrderReview
