import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

//COMPONENTS
import AddAddress from '../../components/Checkout/AddAddress'
import AddressCard from '../../components/Checkout/AddressCard'
import AddressesModal from '../../components/Checkout/AddressesModal'
import CustomizedSteps from '../../components/Checkout/CustomizedSteps'
import Meta from '../../components/Meta/Meta'
import Loader from '../../components/Loader/Loader'
import Layout from '../../components/Layout/Layout'

// MUI COMPONENTS
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

//REDUX ACTIONS
import { getUserInfo } from '../../redux/actions/userActions'

import '../../styles/Shipping.scss'


const Shipping = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const { cartItems } = useSelector((state) => state.cart)
    const { userInfo } = useSelector((state) => state.loginUser)

    useEffect(() => {
        dispatch(getUserInfo(userInfo._id))
    }, [dispatch, userInfo._id])

    const { user, loading } = useSelector((state) => state.userDetails)

    const [shippingAddress, setShippingAddress] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [activeModal, setActiveModal] = useState(1)

    const getDefaultAddress = useCallback(() => {
        const addresses = user.addresses
        const defaultAddress = addresses.find((address) => address.main === true)
        return defaultAddress
    }, [user])

    useEffect(() => {
        if(user && user.addresses) {
            setShippingAddress(getDefaultAddress())
        }
    }, [user, getDefaultAddress])

    const setAsMain = (address) => {
        setShippingAddress(address)
    }

    const setShowModalToTrue = () => {
        setShowModal(true)
    }

    const setShowModalToFalse = () => {
        setShowModal(false)
        setActiveModal(1)
    }

    const handleActiveModal = (value) => {
        setActiveModal(value)
    }

    const proceedToReview = () => {
        sessionStorage.setItem('shippingAddress', JSON.stringify(shippingAddress))
        history.push('/checkout/review')
    }

    const totalItems = () => {
        let total = cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
        return total;
    }

    const shipping = 1000

    const totalItemsPrice = () => {
        let total = cartItems.reduce((price, item) => (item.price * item.qty) + price, 0)
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


    if (loading) {
        return <Layout> <main className="shipping_address"> <Loader /> </main></Layout>
    }

    return (
        <Layout>
            <main className="shipping_address">
                <div className="shipping_container">
                    <Meta title="shipping details" />
                    <CustomizedSteps activeStep={0} />
                    {
                        shippingAddress ? 
                        <section className="address_box">
                            <AddressCard type='shippingAddress' click={setShowModalToTrue} address={shippingAddress} />
                        </section> : 
                        <section className="new_address">
                            <AddAddress type="first" />
                        </section>
                    }
                    
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
                                    <Button onClick={proceedToReview} size="large" variant="contained">Proceed to review</Button>
                                </Grid>    
                            </Grid>
                        </div>
                    </section>

                    {showModal && 
                        <section className="modals">
                            <div className="modals_container">
                                {activeModal === 1 && <AddressesModal data={user.addresses} setAsMain={setAsMain} click={setShowModalToFalse} setActive={handleActiveModal} />}
                                {activeModal === 2 && <div className="new_address"><AddAddress type="new" click={setShowModalToFalse} setActive={handleActiveModal} /></div>}
                            </div>
                        </section>
                    }
                </div>
            </main>
        </Layout>
    )
}

export default Shipping