import * as actionTypes from '../constants/productConstants'
import { logOut } from "./userActions"
import axios from 'axios'

export const getProducts = (keyword = '', pageNumber = '', sortKey = '', sortValue = '') => async (dispatch) => {

    try {
        dispatch({type: actionTypes.GET_PRODUCTS_REQUEST})

        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&sortKey=${sortKey}&sortValue=${sortValue}`)
        
        dispatch({
            type: actionTypes.GET_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });
    }
};

export const getCategoryProducts = (category = 'dresses', pageNumber = '', sortKey = '', sortValue = '') => async (dispatch) => {

    try {
        dispatch({type: actionTypes.GET_CATEGORY_PRODUCTS_REQUEST})

        const { data } = await axios.get(`/api/products/category/?category=${category}&pageNumber=${pageNumber}&sortKey=${sortKey}&sortValue=${sortValue}`)
        
        dispatch({
            type: actionTypes.GET_CATEGORY_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORY_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });
    }
};

export const getGenderProducts = (gender = 'unisex', pageNumber = '', sortKey = '', sortValue = '') => async (dispatch) => {

    try {
        dispatch({type: actionTypes.GET_GENDER_PRODUCTS_REQUEST})

        const { data } = await axios.get(`/api/products/gender/?gender=${gender}&pageNumber=${pageNumber}&sortKey=${sortKey}&sortValue=${sortValue}`)
        
        dispatch({
            type: actionTypes.GET_GENDER_PRODUCTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: actionTypes.GET_GENDER_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {    
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
        });       
    }
};

export const getTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_TOP_PRODUCTS_REQUEST })

        const { data } = await axios.get("/api/products/top")

        dispatch({ 
            type: actionTypes.GET_TOP_PRODUCTS_SUCCESS,
            payload: data 
        })
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOP_PRODUCTS_FAIL,
            payload: error.response && error.response.data.message 
                        ? error.response.data.message 
                        : error.message
        })
    }
};

export const postProductReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.ADD_PRODUCT_REVIEW_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.post(`/api/products/${id}`, review, config)

        dispatch({ 
            type: actionTypes.ADD_PRODUCT_REVIEW_SUCCESS,
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
            type: actionTypes.ADD_PRODUCT_REVIEW_FAIL,
            payload: message
        })
    }
}

export const createProduct = (details) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.NEW_PRODUCT_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'content-type': 'multipart/form-data',
          },
        }

        const { data } = await axios.post("/api/products/", details, config)

        dispatch({ 
            type: actionTypes.NEW_PRODUCT_SUCCESS,
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
            type: actionTypes.NEW_PRODUCT_FAIL,
            payload: message
        })
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.DELETE_PRODUCT_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const { data } = await axios.delete(`/api/products/${id}`, config)

        dispatch({ 
            type: actionTypes.DELETE_PRODUCT_SUCCESS,
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
            type: actionTypes.DELETE_PRODUCT_FAIL,
            payload: message
        })
    }
};

export const updateProduct = (id, details) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.UPDATE_PRODUCT_REQUEST })

        const {
            loginUser: { userInfo },
        } = getState()
      
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'content-type': 'multipart/form-data',
          },
        }

        const { data } = await axios.put(`/api/products/${id}`, details, config)

        dispatch({ 
            type: actionTypes.UPDATE_PRODUCT_SUCCESS,
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
            type: actionTypes.UPDATE_PRODUCT_FAIL,
            payload: message
        })
    }
};

