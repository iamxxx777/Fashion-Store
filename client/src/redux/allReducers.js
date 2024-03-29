import { combineReducers } from 'redux'

import { cartReducer, shippingReducer, confirmCartItems } from './reducers/cartReducers'

import { 
    getProductsReducer, 
    getCategoryProductsReducer,
    getGenderProductsReducer,
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
    addAddressReducer,
    deleteAddressReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
} from "./reducers/userReducer"

import {
    getDashboardStatsReducer,
    getAdminOrdersReducer,
    updateOrderReducer,
    getAdminProductsReducer
} from "./reducers/adminReducer"


const reducers = combineReducers({
    cart: cartReducer,
    orderItems: confirmCartItems,
    shippingAddress: shippingReducer,
    products: getProductsReducer,
    categoryProducts: getCategoryProductsReducer,
    genderProducts: getGenderProductsReducer,
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
    addAddress: addAddressReducer,
    deleteAddress: deleteAddressReducer,
    dashboard: getDashboardStatsReducer,
    adminOrders: getAdminOrdersReducer,
    updateOrder: updateOrderReducer,
    adminProducts: getAdminProductsReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer
})



export default reducers