import * as actionTypes from '../constants/userConstants'
import { CART_RESET } from "../constants/cartConstants"
import axios from 'axios'

export const loginUser = (details) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.LOGIN_REQUEST })

        const { data } = await axios.post("/api/users/login", details)

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

        if(data.isAdmin === true) {
            document.location.href = '/admin'
        } else {
            document.location.href = '/account'
        }

    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        })
    }
}

export const registerUser = (details) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SIGNUP_REQUEST })

        const { data } = await axios.post("/api/users", details)

        dispatch({
            type: actionTypes.SIGNUP_SUCCESS,
            payload: data
        })

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
        document.location.href = '/account'

    } catch (error) {
        dispatch({
            type: actionTypes.SIGNUP_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });
    }
}

export const logOut = () => async (dispatch) => {

    localStorage.removeItem("userInfo")
    localStorage.removeItem("cart")
    localStorage.removeItem("shippingAddress")

    dispatch({ type: actionTypes.LOGOUT_USER })
    dispatch({ type: CART_RESET})
    document.location.href = '/signin'

}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.DELETE_USER_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.delete(`/api/users/profile/${id}`, config)

        dispatch({
            type: actionTypes.DELETE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.DELETE_USER_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });
    }
}


export const getUserInfo = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_USER_INFO_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/users/profile/${id}`, config)

        dispatch({
            type: actionTypes.GET_USER_INFO_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.GET_USER_INFO_FAIL,
            payload: message,
        });
    }
}


export const editProfile = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.EDIT_PROFILE_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.put(`/api/users/profile/${userInfo._id}/`, formData, config)

        dispatch({
            type: actionTypes.EDIT_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.EDIT_PROFILE_FAIL,
            payload: message,
        })
    }
}


export const updatePassword = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.UPDATE_PASSWORD_REQUEST })
        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.put(`/api/users/profile/password/${userInfo._id}`, formData, config)
        dispatch({
            type: actionTypes.UPDATE_PASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.UPDATE_PASSWORD_FAIL,
            payload: message,
        });
    }
}


export const upgradeUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.UPGRADE_USER_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/admin/${id}`, config)

        dispatch({
            type: actionTypes.UPGRADE_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.UPGRADE_USER_FAIL,
            payload: message,
        });
    }
}

export const getAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_USERS_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get("/api/users/profile", config)

        dispatch({
            type: actionTypes.GET_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.GET_USERS_FAIL,
            payload: message,
        });
    }
}

export const getAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.GET_ADDRESS_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.get(`/api/users/profile/${userInfo._id}/address/${id}`, config)

        dispatch({
            type: actionTypes.GET_ADDRESS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.GET_ADDRESS_FAIL,
            payload: message,
        })
    }
}

export const editAddress = (id, address) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.EDIT_ADDRESS_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.put(`/api/users/profile/${userInfo._id}/address/${id}`, address, config)

        dispatch({
            type: actionTypes.EDIT_ADDRESS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.EDIT_ADDRESS_FAIL,
            payload: message,
        })
    }
}

export const addAddress = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.ADD_ADDRESS_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.post(`/api/users/profile/${userInfo._id}/address/`, formData, config)

        dispatch({
            type: actionTypes.ADD_ADDRESS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.ADD_ADDRESS_FAIL,
            payload: message,
        })
    }
}

export const deleteAddress = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.DELETE_ADDRESS_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.delete(`api/users/profile/${userInfo._id}/address/${id}`, config)

        dispatch({
            type: actionTypes.DELETE_ADDRESS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        dispatch({
            type: actionTypes.DELETE_ADDRESS_FAIL,
            payload: message,
        })
    }
}