import * as actionTypes from "../constants/orderConstants";

export const newOrderReducer = (state = { newOrder: {} }, action) => {
    switch(action.type) {
        case actionTypes.CREATE_ORDER_REQUEST:
            return {
                loading: true,
                newOrder: {},
            }
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                newOrder: action.payload,
            }
        case actionTypes.CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.CREATE_ORDER_RESET:
            return {
                loading: false,
                newOrder: {},
            }
        default:
            return state;
    }
};


export const getAllOrdersReducer = (state = { orders: [] }, action) => {
    switch(action.type) {
        case actionTypes.ALL_ORDERS_REQUEST:
            return {
                loading: true,
                orders: [],
            }
        case actionTypes.ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case actionTypes.ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};


export const myOrdersReducer = (state = { myOrders: [] }, action) => {
    switch(action.type) {
        case actionTypes.MY_ORDERS_REQUEST:
            return {
                loading: true,
                myOrders: [],
            }
        case actionTypes.MY_ORDERS_SUCCESS:
            return {
                loading: false,
                myOrders: action.payload,
            }
        case actionTypes.MY_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};


export const getOrderReducer = (state = {order: {}}, action) => {
    switch(action.type) {
        case actionTypes.GET_ORDER_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.GET_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }
        case actionTypes.GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};




export const getPaymentKeyReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.GET_PAYMENT_KEY:
            return {
                key: action.payload
            }
        case actionTypes.GET_PAYMENT_KEY_FAILURE:
            return {
                error: action.payload,
            }
        default:
            return state
    }
}