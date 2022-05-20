import React, { useEffect } from 'react'
import Axios from 'axios'
import { Box } from '@chakra-ui/react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// components
import Navbar from './components/navbar'
import Loading from './components/loading'

// pages
import ShowFormInput from './pages/form-input'
import Login from './pages/login'
import Register from './pages/register'
import VerifPage from './pages/verifpage'
import WaitVerifPage from './pages/waitverifpage'
import ResetPassPage from './pages/resetpass'
import ShowMyProfile from './pages/myprofile'
import ResetOkPage from './pages/resetok'
import UploadPage from './pages/xxdummyupload'


function MainDatam() {
    const location = useLocation()

    // global state
    const loading = useSelector((state) => state.user.loading)
    const dispatch = useDispatch()

    // side-effect
    useEffect(() => {
        const uid = localStorage.getItem("uid")
        dispatch({ type : 'ON_START' })

        Axios.get(process.env.REACT_APP_API_URL + `/users/${uid}`)
        .then((respond) => {
            dispatch({ type : 'LOGIN', payload : respond.data })
            dispatch({ type : 'ON_END'})
        })
        .catch((error) => {
            console.log(error)
            dispatch({ type : 'ON_END'})
        })
    }, [])

    return (
        <Box w="100vw" h="100vh" backgroundColor="#F7F7F7">
            <Navbar pathname={location.pathname}/>
            <Routes>
                <Route path="/" element={<ShowFormInput/>}/>
                <Route path="/myprofile" element={<ShowMyProfile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/regis" element={<Register/>}/>
                <Route path="/verified" element={<VerifPage/>}/>
                <Route path="/waitverified" element={<WaitVerifPage/>}/>
                <Route path="/resetpass" element={<ResetPassPage/>}/>
                <Route path="/resetok" element={<ResetOkPage/>}/>
            </Routes>
            <Loading isLoading={loading}/>
        </Box>    
    )
}

export default MainDatam