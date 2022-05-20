import React from 'react'
import { Flex, Text, Box } from '@chakra-ui/react'
import { useNavigate, Navigate } from 'react-router-dom'

import ShowSidebar from '../components/sidebar'
import ShowRightBar from '../components/rightbar'
import ShowDiscover from '../components/discover'
import ShowBio from '../components/showbio'

const API_URL = process.env.REACT_APP_API_URL

export default function ShowMyProfile () {
    const token = localStorage.getItem('Auth-Token')
    if (!token) return <Navigate to="/"/>
    return (
        <Flex px="10%" py={35} w="100%" h="auto" paddingTop="100px" backgroundColor="#F7F7F7">
            <Box flex="4">
                <ShowBio/>
                <Flex>
                    <ShowSidebar/>
                    <ShowDiscover/>
                </Flex>
            </Box>
            <ShowRightBar/>
        </Flex>
    )
}