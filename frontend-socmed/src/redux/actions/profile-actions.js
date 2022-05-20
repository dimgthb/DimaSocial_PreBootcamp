import Axios from 'axios'
import { GET_DATA_PROFILE, ON_FETCH_END, ON_FETCH_START } from './types'
const API_URL = process.env.REACT_APP_API_URL
const uid = localStorage.getItem("uid")

// get data
export const getProfile = () => {
    return async (dispatch) => {
        try {
            dispatch({ type : ON_FETCH_START })

            // fecth data
            const { data } = await Axios.get(API_URL + `/profile/:${uid}`)
            dispatch({ 
                type : GET_DATA_PROFILE,
                payload : {
                    data : data.data
                }
            })

            dispatch({ type : ON_FETCH_END })
        } catch (error) {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        }
    }
}

// pacth data
export const pacthProfile = (newprofile) => {
    return (dispatch) => {
        dispatch({ type : ON_FETCH_START })
        
        Axios.patch(API_URL +  `/profile/${uid}`, newprofile)
        .then((respond) => {
            Axios.get(API_URL + `/profile/${uid}`)
            .then((respond2) => {
                dispatch({ type : GET_DATA_PROFILE, payload : respond2.data.data })
                dispatch({ type : ON_FETCH_END })
            })
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : ON_FETCH_END })
        })
    }
}  

//     return async (dispatch) => {
//         try {
//             dispatch({ type : GET_DATA_PROFILE })

//             // AJAX request : patch
//             await Axios.pacth(API_URL + `/profile/:${uid}`, newprofile)
//             .then((respond)=>{
//                 Axios.get(API_URL + `/profile/:${uid}`)
//                 .then((respond2) =>{
//                     dispatch({ type : GET_DATA_PROFILE, payload : respond2.data })            
//                     dispatch({ type : ON_FETCH_END})
//                 })
                
//             })
//             return [true, '']
//         } catch (error) {
//             console.log('error :', error)
//             dispatch({ type : ON_FETCH_END })
//             return [false, error.response ? error.response.data : error]
//         }
//     }
// }

// // delete data
// export const deleteStudent = (id, page, limit = 5) => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type : GET_STUDENT_DATA_START })

//             // AJAX request to delete data -> soft delete
//             const respond = await Axios.delete(API_URL + `/students/soft/${id}`)
//             console.log(respond.data)

//             // AJAX request to fecth new data
//             const { data } = await Axios.get(API_URL + `/students?_page=${page}&_limit=${limit}`)
//             dispatch({
//                 type : GET_STUDENT_DATA,
//                 payload : {
//                     data : data.data,
//                     count : data.total_count
//                 }
//             })

//             dispatch({ type : GET_STUDENT_DATA_END })

//             // return info
//             return [true, '']
//         } catch (error) {
//             console.log(error)
//             dispatch({ type : GET_STUDENT_DATA_END })

//             // if failed
//             return [false, error.response ? error.response.data : error]
//         }
//     }
// }

// post data
export const pacthProfilecc = (newprofile) => {
    return async (dispatch) => {
        try {
            dispatch({ type : GET_DATA_PROFILE })

            // AJAX request : POST
            await Axios.patch(API_URL + `profile/:${uid}`, newprofile)
            
            dispatch({ type : ON_FETCH_END })

            return [true, '']
        } catch (error) {
            console.log('error :', error)
            dispatch({ type : ON_FETCH_END })
            return [false, error.response ? error.response.data : error]
        }
    }
}

// edit data
export const editStudent = (id, data) => {
    return (dispatch) => {

    }
    
}

// sort data
export const sortStudentData = (type = 'asc') => {
    return (dispatch) => {

    }
}

