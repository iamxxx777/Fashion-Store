import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = {cartItems : {}}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART: 
            const item = action.payload;

            const itemExist = state.cartItems.find((a) => a.product === item.product && a.size === item.size)

            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === itemExist.product && x.size === itemExist.size ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }

        case actionTypes.REMOVE_FROM_CART:
            const delItem = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.filter((a) => !(a.product === delItem.id && a.size === delItem.size)),
            }
        case actionTypes.UPDATE_CARTITEM_QTY:
            const updateItem = action.payload

            return {
                ...state,
                cartItems: state.cartItems.map((a) => a.product === updateItem.product && a.size === updateItem.size ? updateItem : a)
            }
        case actionTypes.CART_RESET:
            return {
                ...state,
                cartItems: [],
            }
        case actionTypes.CHANGE_CART_ITEMS:
            return {
                cartItems: action.payload,
            }
        default:
            return state
    }
}


export const confirmCartItems = (state = {orderItems: []}, action) => {
    switch(action.type) {
        case actionTypes.CONFIRM_CART_ITEMS_REQUEST:
            return {
                loading: true,
                orderItems: []
            }
        case actionTypes.CONFIRM_CART_ITEMS_SUCCESS:
            return {
                loading: false,
                orderItems: action.payload,
            }
        case actionTypes.CONFIRM_CART_ITEMS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}



export const shippingReducer = (state = {address : {}}, action) => {
    switch(action.type) {
        case actionTypes.SHIPPING_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        default:
            return state
    }
}



