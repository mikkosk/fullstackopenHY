import loginService from '../services/login'
import blogsService from '../services/blogs'

const loginReducer = (state = {}, action) => {
    if(action.type === 'SET_USER') {
        return action.content
    } else if (action.type === 'CLEAR_USER') {
        return ''
    }
    return state
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedUser')
        dispatch({
            type: 'CLEAR_USER'
        })
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const loginUser = await loginService.login({
            username: username,
            password: password
        })
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(loginUser)
        )

        blogsService.setToken(loginUser.token)
        dispatch({
            type:'SET_USER',
            content: {
                token: loginUser.token,
                name: loginUser.name,
                username: loginUser.username
            }
        })
    }
}

export const initializeUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            dispatch({
                type:'SET_USER',
                content:  {
                    token: user.token,
                    name: user.name,
                    username: user.username
                }
            })
        }
    }
}

export default loginReducer