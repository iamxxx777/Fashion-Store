import * as actionTypes from '../constants/adminConstants'
import { logOut } from "../actions/userActions"
import axios from 'axios'


export const getDashboardStats = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_DASHBOARD_STATS_REQUEST })

        const { userInfo } = getState().loginUser
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get("/api/admin/", config)

        dispatch({
            type: actionTypes.GET_DASHBOARD_STATS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_DASHBOARD_STATS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const getAdminProducts = (pageNumber = '', sortKey = '', sortValue = '', filterKey = '') => async (dispatch, getState) => {

    if(sortKey === 'undefined') sortKey = ''
    if(sortValue === 'undefined') sortValue = ''
    if(filterKey === 'undefined') filterKey = ''

    try {
        dispatch({type: actionTypes.GET_ADMIN_PRODUCTS_REQUEST})

        const { userInfo } = getState().loginUser
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/admin/products?pageNumber=${pageNumber}&sortKey=${sortKey}&sortValue=${sortValue}&filterKey=${filterKey}`, config)
        
        dispatch({
            type: actionTypes.GET_ADMIN_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ADMIN_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });
    }
};

export const getOrders = (keyword = "", pageNumber = "") => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_ADMIN_ORDERS_REQUEST })

        const { userInfo } = getState().loginUser
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/admin/orders?keyword=${keyword}&pageNumber=${pageNumber}`, config)

        dispatch({
            type: actionTypes.GET_ADMIN_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ADMIN_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const updateOrderStatus = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.UPDATE_ORDER_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.put(`/api/orders/${id}`, status, config)

        dispatch({
            type: actionTypes.UPDATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.UPDATE_ORDER_FAIL,
            payload: message,
        })
    }
}