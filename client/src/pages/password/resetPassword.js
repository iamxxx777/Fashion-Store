import { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS
import CustomSnackbar from '../../components/Alert/CustomSnackbar'

// LAYOUT
import Layout from '../../components/Layout/Layout'

// REDUX ACTIONS
import { resetPassword as passwordReset } from "../../redux/actions/userActions"
import { RESET_PASSWORD_RESET } from '../../redux/constants/userConstants'

// MUI COMPONENTS
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'

//ICONS
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'
import KeyIcon from '@mui/icons-material/Key'

import '../../styles/PasswordReset.scss'

const ResetPassword = () => {
    const passwordRef = useRef(null)
    const history = useHistory()
    const dispatch = useDispatch()


    const { loading, error, result } = useSelector(
        (state) => state.resetPassword
    )

    const search = window.location.search
    const params = new URLSearchParams(search)
    const token = params.get("token")
    const id = params.get('id')

    // ALERT STATE
    const [showAlert, setShowAlert] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [msg, setMsg] = useState('')
    const [formError, setFormError] = useState("")

    // PASSWORD STATE
    const [registerPassword, setRegisterPassword] = useState('')
    const [password2, setPassword2] = useState('')

    // PASSWORD TOGGLE
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!registerPassword || !password2) {
            setFormError('Please fill all fields')
            return
        }

        if (registerPassword !== password2) {
            setFormError('Passwords do not match')
            return
        }

        if (registerPassword.length < 6) {
            setFormError('Passwords should be a minimum of 6 characters')
            return
        }

        if (!token || !id) {
            setFormError('Invalid token')
            history.replace('/signin')
        }

        dispatch(passwordReset({ password: registerPassword, token, id }))
    }

    useEffect(() => {
        passwordRef.current.focus()
    }, [])


    useEffect(() => {
        if(result && result.success) {
            setSeverity('success')
            setMsg('Passwords reset successful')
            setShowAlert(true)

            setTimeout(() => {
                history.replace('/signin')
            }, 2000)
        } 

        if(error) {
            setSeverity('error')
            setMsg(error)
            setShowAlert(true)
        }

        dispatch({ type: RESET_PASSWORD_RESET })
    }, [result, error, history, dispatch])


    return (
        <Layout>
            <div className="forgot_password">
                <div className="forgot_container">
                    <h1>Reset Password</h1>
                    <div className="icon_div">
                        <div className="icon_circle">
                            <div className="icon">
                                <KeyIcon />
                            </div>
                        </div>
                    </div>
                    {formError && <Alert sx={{mb: 2}} severity="error">{formError}</Alert>}
                    <form onSubmit={handleSubmit} onChange={() => setFormError("")}>
                        <Grid container rowSpacing={3}>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="register-password">
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="register-password"
                                        required
                                        type={
                                            showRegisterPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        ref={passwordRef}
                                        value={registerPassword}
                                        onChange={(e) =>
                                            setRegisterPassword(e.target.value)
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowRegisterPassword(
                                                            !showRegisterPassword
                                                        )
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showRegisterPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                >
                                    <InputLabel htmlFor="password-2">
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="password-2"
                                        required
                                        type={
                                            showPassword2 ? 'text' : 'password'
                                        }
                                        value={password2}
                                        onChange={(e) =>
                                            setPassword2(e.target.value)
                                        }
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword2(
                                                            !showPassword2
                                                        )
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showRegisterPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password 2"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <LoadingButton
                            sx={{ mt: 3, mb: 3 }}
                            fullWidth
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                            type="submit"
                            size="large"
                        >
                            Change Password
                        </LoadingButton>
                    </form>

                    <CustomSnackbar
                        severity={severity}
                        open={showAlert}
                        click={() => setShowAlert(false)}
                        message={msg}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default ResetPassword
