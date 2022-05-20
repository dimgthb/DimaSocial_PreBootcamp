import Axios from 'axios'
import { GET_RESPOND } from './types'
const API_URL = process.env.REACT_APP_API_URL

export const getResp = () => {
    return (dispatch) => {
        Axios.post(API_URL + '/users/regis')
        .then((respond)=> {
            dispatch({type : GET_RESPOND, payload : {message}})
        })
    }
}