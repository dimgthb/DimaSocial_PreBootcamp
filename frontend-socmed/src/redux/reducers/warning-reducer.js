import { GET_RESPOND } from '../actions/types'

const INITIAL_STATE = {
    message : '',
    loading : false
}

function warnReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_RESPOND :
            return { ...state, message : action.payload }
        default :
            return state
    }
} 

export default warnReducer