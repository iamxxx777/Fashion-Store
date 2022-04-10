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

export const updateOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_ORDER_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case actionTypes.UPDATE_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.UPDATE_ORDER_RESET:
            return {
                
            }
        default:
            return state;
    }
};