import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'


// ICONS
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'


// REDUX ACTIONS
import { updatePassword } from '../../redux/actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants'

// STYLE
import '../../styles/ProfileEdit.scss'

const ChangePassword = ({ click }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, result } = useSelector(state => state.updatePassword)

    useEffect(() => {
        if(result && result.success) {
            dispatch({ type: UPDATE_PASSWORD_RESET })
            alert.success('Password Updated')
            history.push("/account")
        }
    }, [dispatch, history, result, alert])

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showNewPassword2, setShowNewPassword2] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(newPassword.length < 6) {
            alert.error('Password must be at least 6 characters')
        } else if(newPassword !== newPassword2) {
            alert.error('New passwords do not match')
        } else {
            const data = { currentPassword, newPassword }
            dispatch(updatePassword(data))
        }

    }

  return (
    <section className="password_change">
        <div className="password_header">
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
        <div className="container">
            <form onSubmit={handleSubmit}>
                {error && <small style={{ color: "red", marginBottom: "2rem" }}>{error}</small>}
                <Grid container rowSpacing={3} columnSpacing={6}>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="password">Current Password</InputLabel>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="new-password">New Password</InputLabel>
                            <Input
                                id="new-password"
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="standard" fullWidth>
                            <InputLabel htmlFor="password2">New Password 2</InputLabel>
                            <Input
                                id="password2"
                                type={showNewPassword2 ? 'text' : 'password'}
                                value={newPassword2}
                                onChange={(e) => setNewPassword2(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowNewPassword2(!showNewPassword2)}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showNewPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container rowSpacing={2} columnSpacing={6} sx={{ mt: 2, '& button': { width: "100%" } }} >
                    <Grid item xs={12}>
                        <LoadingButton
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                        >
                            Change Password
                        </LoadingButton>
                    </Grid>    
                </Grid>
            </form>
        </div>
    </section>
  )
}

export default ChangePassword

// sx={{
//     '& .MuiInputLabel-root': {
//         color: '#7D879C',
//     },
//     '& .MuiInput-root': {
//         color: '#2B3445',
//     },
// }}