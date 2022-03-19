import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

// MUI COMPONENTS
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'

// ICONS
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'


// REDUX ACTIONS
import { addAddress } from '../../redux/actions/userActions'
import { ADD_ADDRESS_RESET } from '../../redux/constants/userConstants'


const AddAddress = ({ type, click }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { userInfo } = useSelector((state) => state.loginUser)
    const { result, loading, error } = useSelector((state) => state.addAddress)


    const [firstName, setFirstName] = useState(userInfo.firstName || "")
    const [lastName, setLastName] = useState(userInfo.lastName || "")
    const [phone, setPhone] = useState(userInfo.phone || "")
    const [phone2, setPhone2] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [street, setStreet] = useState("")
    const [landmark, setLandmark] = useState("")


    const handleSubmit = (e) => {
        e.preventDefault()

        const shippingInfo = { firstName, lastName, phone, phone2, state, city, address: street, landmark }

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

        dispatch(addAddress(shippingInfo))
    }


    useEffect(() => {
        if(result && result.success) {
            dispatch({ type: ADD_ADDRESS_RESET })
            alert.success('Address Added')
            window.location.reload()
        }
    }, [dispatch, alert, result])


    return (
        <div className="add_address">
            <div className="container">
                <div className="head">
                    {type === 'first' && 
                        <>
                            <h2>Shipping Address</h2>
                        </>
                    }
                    {type === 'new' && 
                        <>
                            <button onClick={click}><CloseIcon /></button>
                            <h2>Add Address</h2>
                        </>
                    }
                </div>
                <div className="form">
                    {error && <small style={{ color: "red", marginBottom: "2rem" }}>{error}</small>}
                    <form onSubmit={handleSubmit}>
                        <Grid container rowSpacing={3} columnSpacing={6}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    fullWidth 
                                    label="First Name" 
                                    variant="outlined" 
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    fullWidth 
                                    label="Last Name" 
                                    variant="outlined" 
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
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
                                    size='small'
                                    fullWidth 
                                    label="Phone 2" 
                                    variant="outlined" 
                                    value={phone2}
                                    onChange={(e) => setPhone2(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    fullWidth 
                                    multiline
                                    rows={3}
                                    label="Address" 
                                    variant="outlined" 
                                    value={street}
                                    required
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size='small'
                                    fullWidth 
                                    multiline
                                    rows={2}
                                    label="Nearest landmark" 
                                    variant="outlined" 
                                    required
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    fullWidth 
                                    label="State" 
                                    variant="outlined" 
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    size='small'
                                    fullWidth 
                                    label="City" 
                                    variant="outlined" 
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 2, '& button': { width: "100%" } }} >
                            <Grid item xs={12}>
                                <LoadingButton
                                    endIcon={<SaveIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                    type="submit"
                                    size='large'
                                >
                                    Save
                                </LoadingButton>
                            </Grid>    
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddAddress