import userService from '../services/users'

const userReducer = (state = [], action) => {
    if (action.type === 'INITIALIZE_USERS') {
        return action.data
    } else if (action.type === 'GET_USER_BY_ID') {
        return action.data
    }
    return state
}

export const initializeUsers = () => {
    return async dispatch => {
        const data = await userService.getAll()
        dispatch({
            data,
            type: 'INITIALIZE_USERS'
        })
    }
}

export const getUserById = (id) => {
    return async dispatch => {
        const allUsers = await userService.getAll()
        const data = allUsers.find(u => u.id === id)
        console.log(data)
        dispatch({
            data,
            type: 'GET_USER_BY_ID'
        })
    }
}

export default userReducer