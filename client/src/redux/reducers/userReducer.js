import * as actionTypes from "../constants/userConstants"

export const deleteUserReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.DELETE_USER_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.DELETE_USER_SUCCESS:
            return {
                loading: false,
                deleted: true
            }
        case actionTypes.DELETE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default: {
            return state;
        }
    }
}

export const userLoginReducer = (state = {userInfo : {}}, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return {
                loginLoading: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                loginLoading: false,
                loginUser: action.payload,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                loginLoading: false,
                loginError: action.payload,
            }
        case actionTypes.LOGIN_RESET:
            return {}
        case actionTypes.LOGOUT_USER:
            return {
                loginUser: {},
            }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {userData: {}}, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_REQUEST:
            return {
                registerLoading: true,
            }
        case actionTypes.SIGNUP_SUCCESS:
            return {
                registerLoading: false,
                registerUser: action.payload,
            }
        case actionTypes.SIGNUP_FAIL:
            return {
                registerLoading: false,
                registerError: action.payload,
            }
        case actionTypes.SIGNUP_RESET:
            return {}
        case actionTypes.LOGOUT_USER:
            return {
                registerUser: {},
            }
        default:
            return state
    }
}

export const userDetailsReducer = (state = {user: {}}, action) => {
    switch(action.type) {
        case actionTypes.GET_USER_INFO_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.GET_USER_INFO_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }
        case actionTypes.GET_USER_INFO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.LOGOUT_USER:
            return {
                user: {},
            }
        default:
            return state;
    }
}

export const editProfileReducer = (state = {result: {}}, action) => {
    switch(action.type) {
        case actionTypes.EDIT_PROFILE_REQUEST:
            return {
                loading: true,
                result: {},
            }
        case actionTypes.EDIT_PROFILE_SUCCESS:
            return {
                loading: false,
                result: action.payload,
            }
        case actionTypes.EDIT_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.EDIT_PROFILE_RESET:
            return {}
        default:
            return state;
    }
}

export const updatePasswordReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.UPDATE_PASSWORD_SUCCESS:
            return {
                loading: false,
                result: action.payload
            }
        case actionTypes.UPDATE_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.UPDATE_PASSWORD_RESET:
            return {}
        case actionTypes.LOGOUT_USER:
            return {
                userInfo: {},
            }
        default:
            return state;
    }
}

export const upgradeUserReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.UPGRADE_USER_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.UPGRADE_USER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case actionTypes.UPGRADE_USER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getAllUsersReducer = (state = {users: []}, action) => {
    switch(action.type) {
        case actionTypes.GET_USERS_REQUEST:
            return {
                loading: true,
                users: [],
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case actionTypes.GET_USERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getAddressReducer = (state = {address: {}}, action) => {
    switch(action.type) {
        case actionTypes.GET_ADDRESS_REQUEST:
            return {
                loading: true,
                address: {},
            }
        case actionTypes.GET_ADDRESS_SUCCESS:
            return {
                loading: false,
                address: action.payload,
            }
        case actionTypes.GET_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const editAddressReducer = (state = {result: {}}, action) => {
    switch(action.type) {
        case actionTypes.EDIT_ADDRESS_REQUEST:
            return {
                loading: true,
                result: {},
            }
        case actionTypes.EDIT_ADDRESS_SUCCESS:
            return {
                loading: false,
                result: action.payload,
            }
        case actionTypes.EDIT_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.EDIT_ADDRESS_RESET:
            return {}
        default:
            return state;
    }
}

export const addAddressReducer = (state = {result: {}}, action) => {
    switch(action.type) {
        case actionTypes.ADD_ADDRESS_REQUEST:
            return {
                loading: true,
                result: {},
            }
        case actionTypes.ADD_ADDRESS_SUCCESS:
            return {
                loading: false,
                result: action.payload,
            }
        case actionTypes.ADD_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.ADD_ADDRESS_RESET:
            return {}
        default:
            return state;
    }
}

export const deleteAddressReducer = (state = {result: {}}, action) => {
    switch(action.type) {
        case actionTypes.DELETE_ADDRESS_REQUEST:
            return {
                loading: true,
                result: {},
            }
        case actionTypes.DELETE_ADDRESS_SUCCESS:
            return {
                loading: false,
                result: action.payload,
            }
        case actionTypes.DELETE_ADDRESS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case actionTypes.DELETE_ADDRESS_RESET:
            return {}
        default:
            return state;
    }
}

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FORGOT_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.FORGOT_PASSWORD_SUCCESS:
            return {
                loading: false,
                result: action.payload,
            }
        case actionTypes.FORGOT_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.FORGOT_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}

export const resetPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.RESET_PASSWORD_REQUEST:
            return {
                loading: true,
            }
        case actionTypes.RESET_PASSWORD_SUCCESS:
            return {
                loading: false,
                result: action.payload,
            }
        case actionTypes.RESET_PASSWORD_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case actionTypes.RESET_PASSWORD_RESET:
            return {}
        default:
            return state
    }
}