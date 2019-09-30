const initialState = {filter: ''}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    
    case 'CHANGE':
      return action.data

    default:
      return state
  }


}

export const changeFilter = (filter) => {
    return {
        type: 'CHANGE',
        data: {
          filter
        }
      }
}

export default reducer