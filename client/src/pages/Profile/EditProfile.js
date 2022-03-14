import { useState, useEffect } from 'react'
import { useSelector, useDispatch  } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import LoadingButton from '@mui/lab/LoadingButton'


// ICONS
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import SaveIcon from '@mui/icons-material/Save'


// REDUX ACTIONS
import { editProfile } from '../../redux/actions/userActions'
import { EDIT_PROFILE_RESET } from '../../redux/constants/userConstants'

// STYLE
import '../../styles/ProfileEditAddress.scss'


const EditProfile = ({ click, user }) => {

    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { result, loading, error } = useSelector((state) => state.editProfile)

    const [firstName, setFirstName] = useState(user.firstName || "")
    const [lastName, setLastName] = useState(user.lastName || "")
    const [phone, setPhone] = useState(user.phone || "")
    const [gender, setGender] = useState(user.gender || "")

    const email = user.email

    useEffect(() => {
        if(result && result.success) {
            dispatch({ type: EDIT_PROFILE_RESET })
            alert.success('Profile updated')
            history.push("/account")
            window.location.reload()
        }
    }, [dispatch, history, result, alert])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = { firstName, lastName, phone, gender }
        dispatch(editProfile(formData))
    } 

    return (
        <section className="edit_profile">
            <div className="edit_profile_header">
                <div className="title">
                    <button onClick={() => history.goBack()}> 
                        <ArrowBackOutlinedIcon />
                    </button>
                    <h1>Edit Profile</h1>
                </div>
                <div className="mb_btn">
                    <button onClick={click}> <MenuIcon /> </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {error && <small style={{ color: "red", marginBottom: "2rem" }}>{error}</small>}
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
                            required 
                            label="First Name" 
                            variant="standard" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
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
                            required 
                            label="Last Name" 
                            variant="standard" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            required 
                            disabled
                            label="Email" 
                            variant="standard" 
                            defaultValue={email}
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
                            label="Phone (optional)" 
                            variant="standard" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth variant="standard" >
                            <InputLabel id="gender">Gender</InputLabel>
                            <Select
                                labelId="gender"
                                id="gender-select"
                                value={gender}
                                label="Gender"
                                onChange={(e) => setGender(e.target.value)}
                            >
                            <MenuItem value={'female'}>Female</MenuItem>
                            <MenuItem value={'male'}>Male</MenuItem>
                            </Select>
                        </FormControl>
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
                        >
                            Save
                        </LoadingButton>
                    </Grid>    
                </Grid>
            </form>
        </section>
    )
}

export default EditProfile
