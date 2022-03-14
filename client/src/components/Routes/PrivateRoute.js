import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { userInfo } = useSelector((state) => state.loginUser)

    return (
        <Route
            {...rest}
            render={props => {
                return userInfo.token ? <Component {...props} /> : <Redirect to="/signin" />
            }}
        ></Route>
    )
}

export default PrivateRoute
