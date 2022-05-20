import { GET_DATA_PROFILE, ON_FETCH_END, ON_FETCH_START } from '../actions/types'

const INITIAL_STATE = {
    fullname : '',
    bio : '',
    profilpic : '',
    loading : false
}

function profileReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case ON_FETCH_START :
            return { ...state, loading : true }
        case ON_FETCH_END :
            return { ...state, loading : false }
        case GET_DATA_PROFILE :
            return { 
                ...state, 
                fullname : action.payload.data.fullname, 
                bio : action.payload.data.bio, 
                profilpic : action.payload.data.profilpic
            }
        default :
            return state
    }
} 

export default profileReducer