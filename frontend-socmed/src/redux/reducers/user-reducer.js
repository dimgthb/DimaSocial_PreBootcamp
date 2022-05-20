import { LOGIN, LOGOUT, ON_START, ON_END } from '../actions/types'

const INITIAL_STATE = {
    username : '',
    email : '',
    status : ""
}

function userReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case LOGIN :
            return {
                ...state,
                username : action.payload.username,
                email : action.payload.email,
                status : action.payload.status
            }
        case LOGOUT :
            return INITIAL_STATE
        case ON_START : 
            return { ...state, loading : true }
        case ON_END :
            return { ...state, loading : false }
        default :
            return state
    }
}

export default userReducer