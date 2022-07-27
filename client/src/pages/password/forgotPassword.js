import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// LAYOUT
import Layout from '../../components/Layout/Layout'

// REDUX ACTIONS
import { forgotPassword as resetPassword } from "../../redux/actions/userActions"
import { FORGOT_PASSWORD_RESET } from "../../redux/constants/userConstants"

// Components
import CustomSnackbar from '../../components/Alert/CustomSnackbar'

//MUI Components
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

// ICONS
import SendIcon from '@mui/icons-material/Send'
import LockIcon from '@mui/icons-material/Lock'

import '../../styles/PasswordReset.scss'

const ForgotPassword = () => {
    const emailRef = useRef(null)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')

    // ALERT STATE
    const [showAlert, setShowAlert] = useState(false)
    const [severity, setSeverity] = useState('success')
    const [msg, setMsg] = useState('')

    const { loading, error, result } = useSelector(state => state.forgotPassword)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            setSeverity('error')
            setMsg('Please fill all fields')
            setShowAlert(true)
            emailRef.current.focus()
            return
        }

        dispatch(resetPassword({ email }))
    }

    useEffect(() => {
        emailRef.current.focus()
    }, [])


    useEffect(() => {
        if(result && result.success) {
            setSeverity('success')
            setMsg('A reset link has been sent to your email')
            setShowAlert(true)
            setEmail('')
        }

        if(error) {
            setSeverity('error')
            setMsg(error)
            setShowAlert(true)
        }

        dispatch({ type: FORGOT_PASSWORD_RESET })
    }, [result, error, dispatch])

    return (
        <Layout>
            <div className="forgot_password">
                <div className="forgot_container">
                    <h1>Forgot Password</h1>
                    <div className="icon_div">
                        <div className="icon_circle">
                            <div className="icon">
                                <LockIcon />
                            </div>
                        </div>
                    </div>
                    <p>
                        Enter the email address registered to your account
                        below.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            required
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            name="email"
                            size="small"
                            value={email}
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            Reset Password
                        </LoadingButton>
                    </form>

                    <div className="links">
                        <Link to="/signin">Login</Link>
                        <Link to="/signin">Signup</Link>
                    </div>

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

export default ForgotPassword
