import * as actionTypes from "../constants/cartConstants"
import axios from 'axios'
import { logOut } from "./userActions"

export const addToCart = (id, qty, size, countInStock) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    const { product } = data

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            product: product._id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            images: product.images,
            price: product.price,
            qty,
            size,
            countInStock
        }
    })

    localStorage.setItem('localCart', JSON.stringify(getState().cart.cartItems));
}

export const updateQty = (item, qty, size) => async (dispatch, getState) => {
    item.qty = qty

    dispatch({
        type: actionTypes.UPDATE_CARTITEM_QTY,
        payload: item
    })

    localStorage.setItem('localCart', JSON.stringify(getState().cart.cartItems));
}

export const clearCart = () => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.CART_RESET
    })

    localStorage.setItem('localCart', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id, size) => async (dispatch, getState) => {
    console.log({ id, size })
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: {id, size}
    })

    localStorage.setItem('localCart', JSON.stringify(getState().cart.cartItems));
}

export const confirmOrderItems = () => async (dispatch, getState) => {
    const { cartItems } = getState().cart
    const { userInfo } = getState().loginUser

    const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
    }

    try {
        dispatch({
            type: actionTypes.CONFIRM_CART_ITEMS_REQUEST
        })

        const { data } = await axios.post('/api/orders/confirm', cartItems, config)
    
        dispatch({
            type: actionTypes.CONFIRM_CART_ITEMS_SUCCESS,
            payload: data
        })

        dispatch({
            type: actionTypes.CHANGE_CART_ITEMS,
            payload: data
        })
    
        localStorage.setItem('localCart', JSON.stringify(getState().cart.cartItems))
    
    } catch (error) {
        const message = error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;

        if (message === "Not authorized, token failed") {
            logOut()
        }

        console.log(message)

        dispatch({
            type: actionTypes.CONFIRM_CART_ITEMS_FAIL,
            payload: message,
        });
    }

}


export const setShippingAddress = (details) => async (dispatch, getState) => {
    dispatch({
        type: actionTypes.SHIPPING_ADDRESS,
        payload: details
    })

    localStorage.setItem('shippingAddress', JSON.stringify(getState().shippingAddress.address))
}