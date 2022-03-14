import { useState, useEffect } from 'react'
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { getUserInfo } from '../../redux/actions/userActions'
import { logOut } from '../../redux/actions/userActions'

// Components
import AccountNav from '../../components/Profile/AccountNav'
import Overlay from '../../components/Profile/Overlay'

// Pages
import UserProfile from './UserProfile'
import UserOrders from './UserOrders'
import UserOrder from './UserOrder'
import Addresses from './Addresses'
import EditAddress from './EditAddress'
import AddAddress from './AddAddress'
import ChangePassword from './ChangePassword'
import EditProfile from './EditProfile'


import '../../styles/Account.scss'

const Account = () => {
    const [toggleNav, setToggleNav] = useState(false)
    let { path } = useRouteMatch();
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOut())
    }

    const { userInfo } = useSelector((state) => state.loginUser)
    const { user, loading, error } = useSelector((state) => state.userDetails)

    useEffect(() => {
        dispatch(getUserInfo(userInfo._id))
    }, [dispatch, userInfo._id])



    if(loading) {
        return (
            <main className="customer_account">Loading...</main>
        )
    }

    if(error) {
        return (
            <main className="customer_account">{error}</main>
        )
    }

    return (
        <main className="customer_account">
            <Overlay click={() => setToggleNav(false)} toggle={toggleNav} />
            <div className="customer_account_container">
                <AccountNav logout={handleLogOut} toggle={toggleNav} click={() => setToggleNav(false)} />
                <div className="screen">
                    <Switch> 
                        <Route path={`${path}/editprofile`}> <EditProfile user={user} click={() => setToggleNav(true)} /> </Route>
                        <Route path={`${path}/changepass`}> <ChangePassword click={() => setToggleNav(true)} /> </Route>
                        <Route path={`${path}/address/`}> <AddAddress user={user} click={() => setToggleNav(true)} /> </Route>
                        <Route path={`${path}/editaddress/:id`}> <EditAddress click={() => setToggleNav(true)} /> </Route>
                        <Route path={`${path}/addresses`}> <Addresses addresses={user.addresses} click={() => setToggleNav(true)} /> </Route>
                        <Route path={`${path}/orders`}> <UserOrders click={() => setToggleNav(true)} /> </Route>
                        <Route path={`${path}/order`}> <UserOrder click={() => setToggleNav(true)} /> </Route>
                        <Route exact path={path}> <UserProfile user={user} click={() => setToggleNav(true)} /> </Route>
                    </Switch>
                </div>
            </div>
        </main>
    )
};

export default Account;
