import { PaystackButton } from 'react-paystack'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { createOrder, getPaymentKey } from '../../redux/actions/orderActions'
import { clearCart } from '../../redux/actions/cartActions'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomizedSteps from '../../components/Checkout/CustomizedSteps'

import '../../styles/Checkout.scss'

const Payment = () => {
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    /* Getting the cart items */

    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector((state) => state.loginUser)
    const { newOrder } = useSelector((state) => state.createOrder)
    const { key } = useSelector((state) => state.paymentKey)

    const address = JSON.parse(sessionStorage.getItem('shippingAddress'))
    const { name, email, ...shippingDetails } = address

    
    /* Calculate the price before and after shipping fees */

    const totalItems = () => {
        let total = cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
        return total;
    }

    const shippingFee = 1000

    const totalItemsPrice = () => {
        let total = cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)
        return total;
    }

    const vat = () => {
        let tax = (totalItemsPrice() * 3) / 100
        return tax
    }

    const totalPrice = () => {
        let total = totalItemsPrice() + shippingFee + vat()
        return total.toFixed(2);
    }

    var orderDetails = {
        shippingDetails,
        orderItems: cartItems,
        itemsPrice: totalItemsPrice(),
        shippingFee,
        taxFee: vat(),
        totalPrice: totalPrice(),
        user: userInfo._id,
    }

    const handlePayment = async (response) => {
        orderDetails.paymentStatus = {
            id: response.reference,
            status: response.status
        }  

        dispatch(createOrder(orderDetails))
        dispatch(clearCart())
    }


    const componentProps = {
        email: address.email,
        amount: totalPrice() * 100,
        metadata: {
            name: address.name,
            phone: address.phone,
        },
        publicKey: key,
        text: `Pay ₦${totalPrice()}`,
        onSuccess: (response) => {
            handlePayment(response)
        },
        onClose: () => {
            alert.show("Oh ye, don't go yet")          
        },
    }

    useEffect(() => {
        if(newOrder.paymentStatus) {
            history.replace('/checkout/confirmation', newOrder)
        }
    }, [history, newOrder.paymentStatus])

    useEffect(() => {
        dispatch(getPaymentKey())
    }, [])



    return (
        <main className='payment'>
            <div className="payment_container">
                <CustomizedSteps activeStep={2} />
                <section className="payment_method">
                    <div className="circle">
                        <div className="inner_circle"></div>
                    </div>
                    <h2>Pay with Paystack</h2>
                </section>
                <section className="payment_items_summary">
                    <div className="shipping_details">
                        <h2>Shipping Address</h2>
                        <div className="shipping_details_container">
                            <div className="shipping_detail">
                                <h5>Name</h5>
                                <h3>{address.name}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>Email</h5>
                                <h3>{address.email}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>Phone No</h5>
                                <h3>{address.phone}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>Alternate Phone No</h5>
                                <h3>{address.phone2 || null}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>State</h5>
                                <h3>{address.state}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>City</h5>
                                <h3>{address.city}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>Address</h5>
                                <h3>{address.address}</h3>
                            </div>
                            <div className="shipping_detail">
                                <h5>Landmark</h5>
                                <h3>{address.landmark}</h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className="order_details">
                        <h2>Order Summary</h2>
                        <div className="order_details_header">
                            <h3>Name</h3>
                            <h3>Size</h3>
                            <h3>Qty</h3>
                            <h3>Price</h3>
                        </div>
                        <div className="item">
                            {cartItems.map((item, i) => (
                                <div key={i}>
                                    <h3>{item.name}</h3>
                                    <h3 className='center'>{item.size}</h3>
                                    <h3 className='center'>{item.qty}</h3>
                                    <h3 className='right'>{item.price}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="payment_summary">
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
                            <h3>₦{shippingFee}</h3>
                        </div>
                        <div className="order_summary_item">
                            <h2>Total Price</h2>
                            <h3>₦{totalPrice()}</h3>
                        </div>
                        <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 1, '& button': { width: "100%" } }} >
                            <Grid item xs={12} sm={6} md={12}>
                                <Button size="large" variant="outlined"><Link to="/checkout/review">Back</Link></Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <PaystackButton className="pay_btn" {...componentProps} /> 
                            </Grid>    
                        </Grid>
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Payment
