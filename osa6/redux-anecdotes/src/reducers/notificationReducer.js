const notificationAtStart = ''
  
  const initialState = notificationAtStart
  
  const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
      
    case 'CREATE_NOTIFICATION':
        return action.data

    case 'REMOVE_NOTIFICATION':
        return ''

      default:
        return state
    }

        
    }

    export const createNotification = (content, time) => {
        return async (dispatch) => {
            dispatch({
            type: 'CREATE_NOTIFICATION',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION',
                })
            }, time * 1000)
          }
    }

    export const removeNotification = (id) => {
        return {
            type: 'REMOVE_NOTIFICATION',
            data: {
                id
            }
        }
    }

    export default notificationReducer