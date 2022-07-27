import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

//Routes
import PrivateRoute from "./components/Routes/PrivateRoute"
import AdminRoute from "./components/Routes/AdminRoute"

import Loader from './components/Loader/Loader'

// Pages
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Cart from './pages/Cart'
import Products from './pages/Products'


import "./App.css";


//Splitted Pages
// These pages would be loaded on request by the user

const Signin = React.lazy(() => import("./pages/Signin"))
const AdminPage = React.lazy(() => import("./pages/Admin/AdminPage"))
const GenderProducts = React.lazy(() => import("./pages/GenderProducts"))
const CategoryProducts = React.lazy(() => import("./pages/CategoryProducts"));
const Account = React.lazy(() => import("./pages/Profile/Account"))
const Shipping = React.lazy(() => import("./pages/Checkout/Shipping"));
const OrderReview = React.lazy(() => import("./pages/Checkout/OrderReview"));
const Payment = React.lazy(() => import("./pages/Checkout/Payment"));
const ForgotPassword = React.lazy(() => import("./pages/password/forgotPassword"))
const ResetPassword = React.lazy(() => import("./pages/password/resetPassword"))
const NotFound = React.lazy(() => import('./pages/NotFound'))


function App() {
    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                    <React.Suspense fallback={<Loader />}>
                    <Switch>
                        <Route path="/signin" component={Signin} /> 
                        <Route path="/forgot-password" component={ForgotPassword} />
                        <Route path="/reset-password" component={ResetPassword} />
                        <Route path="/product/:id" component={ProductPage} />
                        <Route path="/products/page/:pageNumber" component={Products} />
                        <Route path="/products" component={Products} />
                        <Route path="/search/:keyword" component={Products} />
                        <Route path="/search/:keyword/page/:pageNumber" component={Products} />
                        <Route path="/cart" component={Cart} />
                        <PrivateRoute path="/account" component={Account} />
                        <PrivateRoute exact path="/checkout" component={Shipping} />
                        <PrivateRoute path="/checkout/review" component={OrderReview} />
                        <PrivateRoute path='/checkout/payment' component={Payment} />
                        <AdminRoute path="/admin" component={AdminPage} />
                        <Route path="/category/:category/page/:pageNumber" component={CategoryProducts} />
                        <Route path="/category/:category" component={CategoryProducts} />
                        <Route path="/gender/:gender/page/:pageNumber" component={GenderProducts} />
                        <Route path="/gender/:gender" component={GenderProducts} />
                        <Route path="/404" component={NotFound} />
                        <Route exact path="/" component={Home} /> 
                        <Route path="/*"> <Redirect from="/" to="/404" /> </Route>
                    </Switch>
                </React.Suspense>
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App;
