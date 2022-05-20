import { Box, Flex, Text, Button, useToast, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export default function WaitVerifPage() {
    const tkn = useRef("")
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const onButtonResend = () => {
        if (tkn.current.value === "") {
            return toast({
                title: 'Warning.',
                description: "Please fill all the empty box.",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        const token = {
            token : tkn.current.value
        }
        console.log(token); 
        setLoading(true)
        Axios.post(API_URL + '/auth/refresh', token)
        .then((respond) => {
            toast({
                title: 'New Code Sent',
                description: 'Resend succesfull, check your email inbox',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            console.log(respond.data)
            setLoading(false)
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
                <Text >Registration Succesfull, Status : "Unverified"</Text>
                <Text >Please Check Your Email to Verify</Text>
                <Text >Use this box to resend code</Text>
                <Input ref={tkn} type="text" placeholder='insert token'/>
                <Button onClick={onButtonResend} colorScheme="green"
                >Resend Code</Button>
            </Flex>

        </Box>
    )
}