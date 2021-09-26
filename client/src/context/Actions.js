export const LoginStart = () => {
    return {
        type: 'LOGIN_START'
    }
}

export const LoginSuccess = (user) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: user
    }
}

export const LoginFailure = () => {
    return {
        type: 'LOGIN_FAILURE'
    }
}

export const Logout = () => {
    return {
        type: 'LOGOUT'
    }
}

export const UpdateStart = () => {
    return {
        type: 'UPDATE_START'
    }
}

export const UpdateSuccess = (user) => {
    return {
        type: 'UPDATE_SUCCESS',
        payload: user
    }
}

export const UpdateFailure = () => {
    return {
        type: 'UPDATE_FAILURE'
    }
}

export const DeleteStart = () => {
    return {
        type: 'DELETE_START'
    }
}

export const DeleteSuccess = () => {
    return {
        type: 'DELETE_SUCCESS'
    }
}

export const DeleteFailure = () => {
    return {
        type: 'DELETE_FAILURE'
    }
}