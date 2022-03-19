import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

//MUI COMPONENTS
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'


// ICONS
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import SaveIcon from '@mui/icons-material/Save'

// REDUX ACTIONS
import { editAddress, getAddress } from '../../redux/actions/userActions'
import { EDIT_ADDRESS_RESET } from '../../redux/constants/userConstants'

// STYLE
import '../../styles/ProfileEditAddress.scss'

const EditshippingAddress = ({ click, user }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getAddress(id))
    }, [dispatch, id])

    const { result, loading, error } = useSelector((state) => state.editAddress)
    const { address: shippingAddress } = useSelector((state) => state.getAddress)


    useEffect(() => {
        if(result && result.success) {
            dispatch({ type: EDIT_ADDRESS_RESET })
            alert.success('Address updated')
            history.push("/account/addresses")
            window.location.reload()
        }
    }, [dispatch, history, result, alert])

    
    const [firstName, setFirstName] = useState(shippingAddress ? shippingAddress.firstName : user.firstName)
    const [lastName, setLastName] = useState(shippingAddress ? shippingAddress.lastName : user.lastName)
    const [phone, setPhone] = useState(shippingAddress ? shippingAddress.phone : user.phone)
    const [phone2, setPhone2] = useState(shippingAddress ? shippingAddress.phone2 : "")
    const [state, setState] = useState(shippingAddress ? shippingAddress.state : "")
    const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "")
    const [street, setStreet] = useState(shippingAddress ? shippingAddress.address : "")
    const [landmark, setLandmark] = useState(shippingAddress ? shippingAddress.landmark : "")
    const [main, setMain] = useState(shippingAddress ? shippingAddress.main : false)


    const handleSubmit = (e) => {
        e.preventDefault()

        const address = street
        const shippingInfo = { firstName, lastName, phone, phone2, state, city, address, landmark, main }

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

        dispatch(editAddress(id, shippingInfo))
    }


    return (
        <section className="edit_address">
            <div className="edit_address_header">
                <div className="title">
                    <button onClick={() => history.goBack()}> 
                        <ArrowBackOutlinedIcon />
                    </button>
                    <h1>Edit Address</h1>
                </div>
                <div className="mb_btn">
                    <button onClick={click}> <MenuIcon /> </button>
                </div>
            </div>
            <div className="form">
                {error && <small style={{ color: "tomato", marginBottom: "2rem" }}>{error}</small>}
                <form onSubmit={handleSubmit}>
                    <Grid container rowSpacing={3} columnSpacing={6}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth 
                                label="First Name" 
                                variant="standard" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth 
                                label="Last Name" 
                                variant="standard" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth 
                                label="Phone" 
                                variant="standard" 
                                value={phone}
                                required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth 
                                label="Phone 2" 
                                variant="standard" 
                                value={phone2}
                                onChange={(e) => setPhone2(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth 
                                label="Address" 
                                variant="standard" 
                                value={street}
                                required
                                onChange={(e) => setStreet(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth 
                                label="Nearest landmark" 
                                variant="standard" 
                                required
                                value={landmark}
                                onChange={(e) => setLandmark(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth 
                                label="State" 
                                variant="standard" 
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth 
                                label="City" 
                                variant="standard" 
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Grid>
                        {!shippingAddress.main && 
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel 
                                    sx={
                                        {
                                            width: '100%',
                                        }
                                    }
                                    control={
                                        <Checkbox 
                                            checked={main}
                                            onChange={(e) => setMain(e.target.checked)}
                                            inputProps={{ 'aria-label': 'controlled' }} 
                                        />
                                    } 
                                    label="Set as default" 
                                />
                            </Grid>
                        }
                    </Grid>

                    <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 2, '& button': { width: "100%" } }} >
                        <Grid item xs={12}>
                            <LoadingButton
                                endIcon={<SaveIcon />}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                                type="submit"
                            >
                                Save
                            </LoadingButton>
                        </Grid>    
                    </Grid>
                </form>
            </div>
        </section>
    )
}


export default EditshippingAddress