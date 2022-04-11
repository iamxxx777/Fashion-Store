import { useState, useEffect } from 'react'
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


// REDUX ACTIONS
import { getDashboardStats } from '../../redux/actions/adminActions'
import { getAllOrders } from '../../redux/actions/orderActions'
import { logOut } from '../../redux/actions/userActions'

// COMPONENTS
import Overlay from '../../components/Admin/Overlay'
import AdminNav from '../../components/Admin/AdminNav'
import Header from '../../components/Admin/Header'

// PAGES
import Dashboard from './Dashboard'
import AllOrders from './AllOrders'
import AllProducts from './AllProducts'
import Order from './Order'

// STYLES
import '../../styles/Admin.scss'

const AdminPage = () => {
    const [toggleNav, setToggleNav] = useState(false)
    const { url } = useRouteMatch()
    const dispatch = useDispatch()

    const { dashboard } = useSelector((state) => state.dashboard)
    const { orders } = useSelector((state) => state.allOrders)

    const latestOrders = orders.slice(0, 10)

    const handleLogOut = () => {
        dispatch(logOut())
    }

    useEffect(() => {
        dispatch(getAllOrders())
        dispatch(getDashboardStats())
    }, [dispatch])

    return (
        <main className="admin">
            <Overlay click={() => setToggleNav(false)} toggle={toggleNav} />
            <div className="admin_container">
                <AdminNav logout={handleLogOut} toggle={toggleNav} click={() => setToggleNav(false)} />
                <div className="screen">
                    <Header click={() => setToggleNav(true)} />
                    <Switch>
                        <Route exact path={`${url}/orders`}> <AllOrders /> </Route>
                        <Route exact path={`${url}/orders/page/:page`}> <AllOrders /> </Route>
                        <Route exact path={`${url}/order/:id`}> <Order /> </Route>
                        <Route exact path={`${url}/products/:pageNumber`}> <AllProducts /> </Route>
                        <Route exact path={`${url}/products`}> <AllProducts /> </Route>
                        <Route exact path={`${url}/search/:keyword`}> <AllProducts /> </Route>
                        <Route exact path={`${url}/search/:keyword/:page`}> <AllProducts /> </Route>
                        <Route exact path={url}> <Dashboard stats={dashboard} orders={latestOrders} /> </Route>
                    </Switch>
                </div>
            </div>
        </main>
    )
}

export default AdminPage