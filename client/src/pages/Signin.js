import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link }  from 'react-router-dom'
import { useAlert } from 'react-alert'

// MUI COMPONENTS
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import LoadingButton from '@mui/lab/LoadingButton'

// LAYOUT
import Layout from '../components/Layout/Layout'


//ICONS
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SendIcon from '@mui/icons-material/Send'

// REDUX ACTIONS
import { loginUser, registerUser } from "../redux/actions/userActions"

// STYLES
import '../styles/Signin.scss'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className="signin_tab_panel"
        {...other}
      >
        {value === index && (
          <div className="tab_panel_container">
            {children}
          </div>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}




const Signin = () => {

    const { loginError, loginLoading } = useSelector((state) => state.loginUser)
    
    const { registerError, registerLoading } = useSelector((state) => state.registerUser)

    const dispatch = useDispatch()
    const alert = useAlert()


    const [tabValue, setTabValue] = useState(0)
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [registerFirstname, setRegisterFirstname] = useState("")
    const [registerLastname, setRegisterLastname] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleLogin = async (e) => {
        e.preventDefault()

        const formData = { email: loginEmail, password: loginPassword }
        dispatch(loginUser(formData))
    }

    const handleSignin = async (e) => {
        e.preventDefault()

        if(registerPassword.length < 6) {
            alert.error('Password must be a minimum of 6 characters')
        } else {
            const formData = { 
                email: registerEmail, 
                password: registerPassword, 
                firstName: registerFirstname, 
                lastName: registerLastname 
            }
    
            dispatch(registerUser(formData))
        }
    }


    return (
        <Layout>
            <main className="signin_page">
                <div className="signin_page_container">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs centered value={tabValue} onChange={handleTabChange} aria-label="Signin page tabs">
                                <Tab label="Login" {...a11yProps(0)} />
                                <Tab label="Register" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={tabValue} index={0}>
                            <div className="login">
                                <form onSubmit={handleLogin}>
                                    <h2>Login</h2>
                                    {loginError && <span style={{ color: "red", marginBottom: "1rem" }}>{loginError}</span>}
                                    <Grid container rowSpacing={3} columnSpacing={6}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                required
                                                fullWidth
                                                label="Email" 
                                                type='email'
                                                variant="outlined" 
                                                value={loginEmail}
                                                onChange={(e) => setLoginEmail(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    type={showLoginPassword ? 'text' : 'password'}
                                                    value={loginPassword}
                                                    onChange={(e) => setLoginPassword(e.target.value)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <LoadingButton
                                        sx={{mt: 2}}
                                        endIcon={<SendIcon />}
                                        loading={loginLoading}
                                        loadingPosition="end"
                                        variant="contained"
                                        type="submit"
                                        size="large"
                                    >
                                        Login
                                    </LoadingButton>
                                    <Link to="/password/reset">Forgot password</Link>
                                    <p>New here, <button type="button" onClick={() => setTabValue(1)}>Sign up</button></p>
                                </form>
                            </div>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <div className="signin">
                                <form onSubmit={handleSignin}>
                                    <h2>Signin</h2>
                                    {registerError && <span style={{ color: "red", marginBottom: "2rem" }}>{registerError}</span>}
                                    <Grid container rowSpacing={3} columnSpacing={6}>
                                        <Grid item xs={12}>
                                            <TextField 
                                                required
                                                fullWidth
                                                label="Email" 
                                                type='email'
                                                variant="outlined" 
                                                value={registerEmail}
                                                onChange={(e) => setRegisterEmail(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField 
                                                required
                                                fullWidth
                                                label="First Name" 
                                                type='text'
                                                variant="outlined" 
                                                value={registerFirstname}
                                                onChange={(e) => setRegisterFirstname(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField 
                                                required
                                                fullWidth
                                                label="Last Name" 
                                                type='text'
                                                variant="outlined" 
                                                value={registerLastname}
                                                onChange={(e) => setRegisterLastname(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" fullWidth>
                                                <InputLabel htmlFor="register-password">Password</InputLabel>
                                                <OutlinedInput
                                                    id="register-password"
                                                    required
                                                    type={showRegisterPassword ? 'text' : 'password'}
                                                    value={registerPassword}
                                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showRegisterPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                    <LoadingButton
                                        sx={{mt: 2}}
                                        endIcon={<SendIcon />}
                                        loading={registerLoading}
                                        loadingPosition="end"
                                        variant="contained"
                                        type="submit"
                                        size="large"
                                    >
                                        SignUp
                                    </LoadingButton>
                                    <p>Already a user, <button type="button" onClick={() => setTabValue(0)}>Login Here</button></p>
                                </form>
                            </div>
                        </TabPanel>
                    </Box>
                </div>
            </main>
        </Layout>
    )
}

export default Signin