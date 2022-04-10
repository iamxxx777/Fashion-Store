import * as actionTypes from '../constants/orderConstants'
import { CART_RESET } from "../constants/cartConstants"
import { logOut } from "../actions/userActions"
import axios from 'axios'


export const createOrder = (details) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.CREATE_ORDER_REQUEST })

        const { userInfo } = getState().loginUser

        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post("/api/orders", details, config)

        dispatch({
            type: actionTypes.CREATE_ORDER_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_RESET
        })
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getPaymentKey = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/config/paystack')

        dispatch({
            type: actionTypes.GET_PAYMENT_KEY,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message

        if (message == "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.GET_PAYMENT_KEY_FAILURE,
            error: message
        })
    }
}

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.ALL_ORDERS_REQUEST })

        const { userInfo } = getState().loginUser
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get("/api/orders", config)

        dispatch({
            type: actionTypes.ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message

        if (message == "Not authorized, token failed") {
            logOut()
        }
                        
        dispatch({
            type: actionTypes.ALL_ORDERS_FAIL,
            payload: message,
        })
    }
}

export const getMyOrders = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.MY_ORDERS_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/orders/myorders/${id}`, config)

        dispatch({
            type: actionTypes.MY_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message

        if (message == "Not authorized, token failed") {
            logOut()
        }
                        
        dispatch({
            type: actionTypes.MY_ORDERS_FAIL,
            payload: message,
        })
    }
}



export const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_ORDER_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: actionTypes.GET_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message

        if (message == "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.GET_ORDER_FAIL,
            payload: message,
        })
    }
}





