import React, { useState, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import ShowSidebar from '../components/sidebar'
import ShowRightBar from '../components/rightbar'
import ShowDiscover from '../components/discover'
const API_URL = process.env.REACT_APP_API_URL

export default function ShowFormInput () {
    
    return (
        <Flex px="10%" py={35} w="100%" h="auto" paddingTop="100px" backgroundColor="#F7F7F7">
            <ShowSidebar/>
            {/* { location.pathname == '/' ? <ShowProfile pathname={location.pathname}/> : null } */}
            <ShowDiscover/>
            <ShowRightBar/>
        </Flex>
    )
}