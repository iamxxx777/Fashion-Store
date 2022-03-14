import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from "react-alert"

import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import CustomizedSteps from '../../components/Checkout/CustomizedSteps'
import Meta from '../../components/Meta/Meta'

import { setShippingAddress } from '../../redux/actions/cartActions'

import '../../styles/Checkout.scss'

const ShippingAddress = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const history = useHistory()

    const { userInfo } = useSelector((state) => state.loginUser)
    const { address } = useSelector((state) => state.shippingAddress)

    const [name, setName] = useState(userInfo.name)
    const [email, setEmail] = useState(userInfo.email)
    const [phone, setPhone] = useState(address.phone || "")
    const [phone2, setPhone2] = useState(address.phone2 || "")
    const [state, setState] = useState(address.state || "")
    const [city, setCity] = useState(address.city || "")
    const [street, setStreet] = useState(address.address || "")
    const [landmark, setLandmark] = useState(address.landmark || "")

    const handleSubmit = (e) => {
        e.preventDefault()

        const shippingInfo = { name, email, phone, phone2, state, city, address: street, landmark }

        if(phone.length < 11 || phone.length > 11) {
            alert.error("Phone Number should be 11 digits Long");
            return;
        }

        if(phone2) {
            if(phone2.length < 11 || phone2.length > 11) {
                alert.error("Phone Number should be 11 digits Long");
                return;
            }
        }

        sessionStorage.setItem('shippingAddress', JSON.stringify(shippingInfo))
        dispatch(setShippingAddress(shippingInfo))
        history.push("/checkout/review")
    }


    return (
        <main className="shipping_address">
            <div className="shipping_container">
                <Meta title="shipping details" />
                <CustomizedSteps activeStep={0} />
                <form onSubmit={handleSubmit}>
                    <h1>Shipping Address</h1>
                    <Grid container rowSpacing={3} columnSpacing={6}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="Full Name" 
                                variant="outlined" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="Email" 
                                type={email}
                                variant="outlined" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="Phone" 
                                variant="outlined" 
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="Phone 2" 
                                variant="outlined" 
                                value={phone2}
                                onChange={(e) => setPhone2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="State" 
                                variant="outlined" 
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="City" 
                                variant="outlined" 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="Address" 
                                variant="outlined" 
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                sx={{
                                    '& .MuiInputLabel-root': {
                                        color: '#7D879C',
                                    },
                                    '& .MuiInput-root': {
                                        color: '#2B3445',
                                    },
                                }}
                                fullWidth 
                                label="Nearest landmark" 
                                variant="outlined" 
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 1, '& button': { width: "100%" } }} >
                        <Grid item xs={12} sm={6}>
                            <Button size="large" variant="outlined"><Link to="/cart">Back To Cart</Link></Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button onClick={handleSubmit} size="large" variant="contained">Review Order</Button>
                        </Grid>    
                    </Grid>
                </form>
            </div>
        </main>
    )
}

export default ShippingAddress
