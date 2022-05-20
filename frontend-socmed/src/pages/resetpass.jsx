import { Box, Flex, Text, Button, useToast, Input, Stack, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export default function ResetPassPage() {
    const email = useRef("")
    const newpass = useRef("")
    const repnewpass = useRef("")
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const [show, setShow] = useState(false)
    const handleClick = () => {setShow(!show)}

    const onButtonPrReset = () => {
        if (email.current.value === "" || newpass.current.value === "" || repnewpass.current.value === "") {
            return toast({
                title: 'Warning.',
                description: "Please fill all the empty box.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        const resetData = {
            email : email.current.value,
            password : newpass.current.value,
            repeat_password : repnewpass.current.value
        }
        console.log(email); 
        setLoading(true)
        Axios.post(API_URL + '/auth/resetcheck', resetData)
        .then((respond) => {
            console.log(respond.data)
            setLoading(false)

            toast({
                title: 'Email Sent',
                description: 'Check your email inbox to proceed',
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
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

    return (
        <Box px="21%" py={145} w="100%" h="auto" backgroundColor="#F7F7F7">
            <Flex px="30%" py={20} spacing="15px" 
            backgroundColor="#FFFFFF" borderRadius="10px" 
            alignItems="center" flexDirection="column">
                <Text fontSize="3xl" fontWeight="bold" color="purple"
                >Reset Password</Text>
                <Stack py={6}>
                    <Text fontWeight="bold">Please insert your email</Text>
                    <Input ref={email} type="text" placeholder='Insert email'/>
                    <Text marginBottom="10px" fontWeight="bold">Insert New Password</Text>
                    <InputGroup size='md'>
                                <Input
                                    ref={newpass}
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
                    <Text marginBottom="10px" fontWeight="bold">Confirm Password</Text>
                    <InputGroup size='md'>
                                <Input
                                    ref={repnewpass}
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
                </Stack>
                <Button onClick={onButtonPrReset} colorScheme="green"
                >Proceed Reset Password</Button>
            </Flex>

        </Box>
    )
}