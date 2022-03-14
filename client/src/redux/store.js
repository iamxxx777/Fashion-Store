import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from "./allReducers"

const middlware = [thunk]

let localCart = localStorage.getItem('localCart')
let localAddress = localStorage.getItem('shippingAddress')
let localUser = localStorage.getItem('userInfo')  

let parsedCart, parsedAddress, parsedUser

if (localCart) {
    parsedCart = JSON.parse(localCart)
} else {
    parsedCart = []
}

if (localAddress) {
    parsedAddress = JSON.parse(localAddress)
} else {
    parsedAddress = {}
}

if (localUser) {
    parsedUser = JSON.parse(localUser)
} else {
    parsedUser = {}
}


const INITIAL_STATE = {
    cart: {
        cartItems: parsedCart
    },
    shippingAddress: {
        address: parsedAddress
    },
    loginUser: {
        userInfo: parsedUser
    }
}

const store = createStore(
    reducers,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middlware))
)

export default store