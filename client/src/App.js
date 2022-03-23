import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useState } from 'react'
import ScrollToTop from './ScrollToTop'

//Routes
import PrivateRoute from "./components/Routes/PrivateRoute"
import AdminRoute from "./components/Routes/AdminRoute"

// Components
import MiniNav from './components/Nav/MiniNav'
import MobileNav from './components/Nav/MobileNav'
import Nav from './components/Nav/Nav'
import CategoryNav from './components/Nav/CategoryNav'
import SideCategory from './components/Nav/SideCategory'
import Overlay from './components/Nav/Overlay'
import Footer from './components/Footer/Footer'

// Pages
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import Signin from './pages/Signin'
import Cart from './pages/Cart'
import Shipping from './pages/Checkout/Shipping'
import OrderReview from './pages/Checkout/OrderReview'
import Payment from './pages/Checkout/Payment'
import Account from './pages/Profile/Account'
import CategoryPage from './pages/CategoryPage'
import Products from './pages/Products'
import NotFound from './pages/NotFound'

import './App.css'

function App() {

  const [toggleSideNav, setToggleSideNav] = useState(false)

  return (
    <Router>
      <div className="App">
        <MiniNav />
        <MobileNav click={() => setToggleSideNav(true)} />
        <Nav />
        <Overlay show={toggleSideNav} click={() => setToggleSideNav(false)} />
        <SideCategory show={toggleSideNav} click={() => setToggleSideNav(false)} />
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
            <PrivateRoute exact path="/checkout" component={Shipping} />
            <PrivateRoute path="/checkout/review" component={OrderReview} />
            <PrivateRoute path='/checkout/payment' component={Payment} />
            <Route path="/category/:category/page/:pageNumber" component={CategoryPage} />
            <Route path="/category/:category" component={CategoryPage} />
            <Route path="/404" component={NotFound} />
            <Route exact path="/" component={Home} /> 
            <Route path="/*"> <Redirect from="/" to="/404" /> </Route>
          </Switch>
        </ScrollToTop>
        <Footer />
      </div>
    </Router>

  )
}

export default App;
