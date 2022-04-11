import { useState, useEffect } from 'react'
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

//Actions
import { getUserInfo,logOut } from '../../redux/actions/userActions'
import { getMyOrders } from '../../redux/actions/orderActions'

// Components
import AccountNav from '../../components/Profile/AccountNav'
import Overlay from '../../components/Profile/Overlay'
import Loader from '../../components/Loader/Loader'
import Layout from '../../components/Layout/Layout'

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
    const { url } = useRouteMatch();
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOut())
    }

    const { userInfo } = useSelector((state) => state.loginUser)
    const { user, loading, error } = useSelector((state) => state.userDetails)
    const { myOrders } = useSelector((state) => state.myOrders)

    useEffect(() => {
        dispatch(getUserInfo(userInfo._id))
        dispatch(getMyOrders(userInfo._id))
    }, [dispatch, userInfo._id])



    if(loading) {
        return (
            <Layout>
                <main className="customer_account"><Loader /></main>
            </Layout>
        )
    }

    if(error) {
        return (
            <Layout>
                <main className="customer_account">{error}</main>
            </Layout>
        )
    }

    return (
        <Layout>
            <main className="customer_account">
                <Overlay click={() => setToggleNav(false)} toggle={toggleNav} />
                <div className="customer_account_container">
                    <AccountNav logout={handleLogOut} toggle={toggleNav} click={() => setToggleNav(false)} />
                    <div className="screen">
                        <Switch> 
                            <Route path={`${url}/editprofile`}> <EditProfile user={user} click={() => setToggleNav(true)} /> </Route>
                            <Route path={`${url}/changepass`}> <ChangePassword click={() => setToggleNav(true)} /> </Route>
                            <Route path={`${url}/address/`}> <AddAddress user={user} click={() => setToggleNav(true)} /> </Route>
                            <Route path={`${url}/editaddress/:id`}> <EditAddress click={() => setToggleNav(true)} /> </Route>
                            <Route path={`${url}/addresses`}> <Addresses addresses={user.addresses} click={() => setToggleNav(true)} /> </Route>
                            <Route path={`${url}/orders`}> <UserOrders click={() => setToggleNav(true)} orders={myOrders} /> </Route>
                            <Route path={`${url}/order/:id`}> <UserOrder click={() => setToggleNav(true)} /> </Route>
                            <Route exact path={url}> <UserProfile user={user} click={() => setToggleNav(true)} orders={myOrders} /> </Route>
                        </Switch>
                    </div>
                </div>
            </main>
        </Layout>
    )
};

export default Account;
