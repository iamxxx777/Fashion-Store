import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'

//Routes
import PrivateRoute from "./components/Routes/PrivateRoute"
import AdminRoute from "./components/Routes/AdminRoute"

// Components
import MiniNav from './components/Nav/MiniNav'
import MobileNav from './components/Nav/MobileNav'
import Nav from './components/Nav/Nav'
import CategoryNav from './components/Nav/CategoryNav'
import Footer from './components/Footer/Footer'

// Pages
import Main from './pages/Main'
import ProductPage from './pages/ProductPage'
import Signin from './pages/Signin'
import Cart from './pages/Cart'
import ShippingAddress from './pages/Checkout/ShippingAddress'
import OrderReview from './pages/Checkout/OrderReview'
import Payment from './pages/Checkout/Payment'
import Confirmation from './pages/Checkout/Confirmation'
import Account from './pages/Profile/Account'
import CategoryPage from './pages/CategoryPage'
import Products from './pages/Products'

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <MiniNav />
        <MobileNav />
        <Nav />
        <CategoryNav />
        <ScrollToTop>
          <Switch>
            <Route path="/signin" component={Signin} /> 
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/products/page/:pageNumber" component={Products} />
            <Route path="/products" component={Products} />
            <Route path="/search/:keyword" component={Products} />
            <Route path="/search/:keyword/page/:pageNumber" component={Products} />
            <Route path="/cart" component={Cart} />
            <PrivateRoute path="/account" component={Account} />
            <PrivateRoute exact path="/checkout" component={ShippingAddress} />
            <PrivateRoute path="/checkout/review" component={OrderReview} />
            <PrivateRoute path='/checkout/payment' component={Payment} />
            <PrivateRoute path='/checkout/confirmation' component={Confirmation} />
            <Route path="/category/:category/page/:pageNumber" component={CategoryPage} />
            <Route path="/category/:category" component={CategoryPage} />
            <Route exact path="/" component={Main} /> 
          </Switch>
        </ScrollToTop>
        <Footer />
      </div>
    </Router>

  )
}

export default App;
