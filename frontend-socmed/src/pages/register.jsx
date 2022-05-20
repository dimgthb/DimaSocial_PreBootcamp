import React, { useRef, useState } from 'react'
import Axios from 'axios'
import { useNavigate, Navigate } from 'react-router-dom'
import { Grid, Box, Stack, Input, Button, Text, Spinner, useToast, InputGroup, InputRightElement } from '@chakra-ui/react'

const API_URL = process.env.REACT_APP_API_URL

export default function Register () {
    const usern = useRef("")
    const email = useRef("")
    const passw = useRef("")
    const cpass = useRef("")
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const handleClick = () => {setShow(!show)}

    const toast = useToast()
    const navigate = useNavigate()

    const onButtonSU = () => {
        // input validation -> nama dan email tidak boleh sama dengan kosong
        if (usern.current.value === "" || email.current.value === "" || passw.current.value === "" || cpass.current.value === "") {
            return toast({
                title: 'Warning.',
                description: "Please fill all the empty box.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        
        const newUser = {
            username : usern.current.value,
            email : email.current.value,
            password : passw.current.value,
            repeat_password : cpass.current.value
        }
        console.log(newUser)

        setLoading(true)
        Axios.post(API_URL+'/users/regis', newUser)
        .then((respond) =>  {
            console.log("respond : ", respond.data)

            // reset state
            usern.current.value = ""
            email.current.value = ""
            passw.current.value = ""
            cpass.current.value = ""

            setLoading(false)
            navigate('/waitverified')
            // return toast({
            //     title: 'Info',
            //     description: "Registration Succesfull, Please Login.",
            //     status: 'success',
            //     duration: 3000,
            //     isClosable: true,
            // })
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
        <Box px="21%" py={145} w="100%" h="auto">
            <Stack px="6%" py={10} borderRadius="10px" spacing="30px" backgroundColor="#FFFFFF">
                <Grid
                h='280px'
                templateRows='repeat(3, 1fr)'
                templateColumns='repeat(2, 1fr)'
                templateAreas="     'user ..'
                                    'email ..'
                                    'pass cpass'"
                gap={4}
                >
                    <Box gridArea="user">
                        <Text marginBottom="10px" fontWeight="bold">Username</Text>
                        <Input ref={usern} type="text" placeholder='Please insert minimum 6 character'/>
                    </Box>
                    <Box gridArea="email">
                        <Text marginBottom="10px" fontWeight="bold">Email</Text>
                        <Input ref={email} type="email" placeholder='Insert valid email'/>                    
                    </Box>
                    <Box gridArea="pass">
                        <Text marginBottom="10px" fontWeight="bold">Password</Text>
                        <InputGroup size='md'>
                                <Input
                                    ref={passw}
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                />
                                  <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                    <Box gridArea="cpass">
                        <Text marginBottom="10px" fontWeight="bold">Confirm Password</Text>
                        <InputGroup size='md'>
                                <Input
                                    ref={cpass}
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Re-enter password'
                                />
                                  <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Grid>
                <Button
                    w="15%"
                    colorScheme='teal' 
                    variant='solid'
                    onClick={onButtonSU}
                    disabled={loading}
                >
                    { loading ? <Spinner size="md"/> : "Sign Up" }
                </Button>
            </Stack>
        </Box>

    )
}