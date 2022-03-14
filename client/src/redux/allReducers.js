import { combineReducers } from 'redux'

import { cartReducer, shippingReducer, confirmCartItems } from './reducers/cartReducers'

import { 
    getProductsReducer, 
    getCategoryProductsReducer,
    getProductDetailsReducer,
    getTopProductsReducer,
    updateProductReducer,
    addProductReviewReducer,
    deleteProductReducer,
    newProductReducer 
} from "./reducers/productReducer"


import {
    newOrderReducer,
    getOrderReducer,
    getAllOrdersReducer,
    myOrdersReducer,
    updateOrderReducer,
    getPaymentKeyReducer
} from "./reducers/orderReducer"


import {
    deleteUserReducer,
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    upgradeUserReducer,
    updatePasswordReducer,
    editProfileReducer,
    getAllUsersReducer,
    getAddressReducer,
    editAddressReducer,
    addAddressReducer
} from "./reducers/userReducer"


const reducers = combineReducers({
    cart: cartReducer,
    orderItems: confirmCartItems,
    shippingAddress: shippingReducer,
    products: getProductsReducer,
    categoryProducts: getCategoryProductsReducer,
    productDetails: getProductDetailsReducer,
    topProducts: getTopProductsReducer,
    updateProduct: updateProductReducer,
    review: addProductReviewReducer,
    deleteProduct: deleteProductReducer,
    newProduct: newProductReducer,
    paymentKey: getPaymentKeyReducer,
    createOrder: newOrderReducer,
    order: getOrderReducer,
    allOrders: getAllOrdersReducer,
    myOrders: myOrdersReducer,
    updateOrder: updateOrderReducer,
    deleteUser: deleteUserReducer,
    userDetails: userDetailsReducer,
    loginUser: userLoginReducer,
    registerUser: userRegisterReducer,
    upgradeUser: upgradeUserReducer,
    editProfile: editProfileReducer,
    updatePassword: updatePasswordReducer,
    allUsers: getAllUsersReducer,
    getAddress: getAddressReducer,
    editAddress: editAddressReducer,
    addAddress: addAddressReducer
})



export default reducers