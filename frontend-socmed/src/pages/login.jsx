import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'
import { Box, Text, Input, Button, Stack, Spinner, useToast, InputGroup, InputRightElement, Flex } from '@chakra-ui/react'

const API_URL = process.env.REACT_APP_API_URL

export default function Login () {
    const usern = useRef("")
    const passw = useRef("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const handleClick = () => {setShow(!show)}

    const toast = useToast()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {message} = useState()

    const onClickResetPass = () => {
       navigate('/resetpass')
    }
    const onButtonLogin = () => {
        const logindata = {
            usernameOrEmail : usern.current.value,
            password : passw.current.value
        }
        
        setLoading(true)
        Axios.post(API_URL + `/auth/login`, logindata)
        .then((res) => {
            console.log("respond :", res.data)
            setLoading(false)
            const servertoken = res.data.data.token
            const serveruid = res.data.data.uid

            // // save token to localstorage
            localStorage.setItem("Auth-Token", servertoken)
            localStorage.setItem("uid", serveruid)

            // // save user data to global state
            dispatch({ type : 'LOGIN', payload : res.data.data })

            // if success
            toast({
                title: 'Login success',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            // redirect to home page
            navigate('/')
        })
        .catch((error) => {
            toast({
                title: 'warning',
                description: error.response.data.message,
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            console.log(error)
            setLoading(false)
        })
    }

    // protection
    
    const token = localStorage.getItem('Auth-Token')
    if (token) return <Navigate to="/"/>

    return (
        <Box px="21%" py={145} w="100%" h="auto" backgroundColor="#F7F7F7">
            <Stack px="30%" py={20} spacing="15px" backgroundColor="#FFFFFF" borderRadius="10px">
                <Text fontWeight="bold">Username or Email</Text>
                <Input ref={usern} type="text" placeholder='socialgod / email@valid.com'/>
                <Text fontWeight="bold">Password</Text>
                <InputGroup size='md'>
                    <Input
                        ref={passw}
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='********'
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Flex justifyContent="space-between" >
                    <Button
                        w="90px"
                        colorScheme='teal' 
                        variant='solid'
                        onClick={onButtonLogin}
                        disabled={loading}
                    >
                        { loading ? <Spinner size="md"/> : "Login" }
                    </Button>
                    <Button onClick={onClickResetPass} colorScheme='blue' variant='link'>
                    Reset Password
                    </Button>
                </Flex>
            </Stack>
        </Box>
    )
}