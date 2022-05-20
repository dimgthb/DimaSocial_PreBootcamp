import { Box, Flex, Text, Button, useToast, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import Axios from "axios";
import { useNavigate, Navigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL

export default function ResetOkPage() {
    const navigate = useNavigate()

    const onButtonLogin = () => {
        navigate('/') 
    }
    return (
        <Box px="21%" py={145} w="100%" h="auto" backgroundColor="#F7F7F7">
            <Flex px="30%" py={20} spacing="15px" 
            backgroundColor="#FFFFFF" borderRadius="10px" 
            alignItems="center" flexDirection="column">
                <Text >Succesfully Reset Password</Text>
                <Button onClick={onButtonLogin} colorScheme="green"
                >Proceed to Homepage</Button>
            </Flex>

        </Box>
    )
}