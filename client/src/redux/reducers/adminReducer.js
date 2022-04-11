import * as actionTypes from "../constants/adminConstants"


export const getDashboardStatsReducer = (state = {dashboard: {}}, action) => {
    switch(action.type) {
        case actionTypes.GET_DASHBOARD_STATS_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.GET_DASHBOARD_STATS_SUCCESS:
            return {
                loading: false,
                dashboard: action.payload
            }
        case actionTypes.GET_DASHBOARD_STATS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: {
            return state;
        }
    }
}

export const getAdminProductsReducer = (state = { products: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            }
        case actionTypes.GET_ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload,
            }
        case actionTypes.GET_ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export const getAdminOrdersReducer = (state = { orders: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_ADMIN_ORDERS_REQUEST:
            return {
                loading: true,
                orders: [],
            }
        case actionTypes.GET_ADMIN_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }
        case actionTypes.GET_ADMIN_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
};

export const updateOrderReducer = (state = {update: {}}, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_ORDER_REQUEST:
            return {
                updateLoading: true,
            }
        case actionTypes.UPDATE_ORDER_SUCCESS:
            return {
                updateLoading: false,
                update: action.payload,
            }
        case actionTypes.UPDATE_ORDER_FAIL:
            return {
                updateLoading: false,
                updateError: action.payload,
            }
        case actionTypes.UPDATE_ORDER_RESET:
            return {}
        default:
            return state;
    }
};