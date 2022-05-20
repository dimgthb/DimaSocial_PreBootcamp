import React from "react";
import { Text, Flex, Button, Box, Input, Textarea, Avatar } from '@chakra-ui/react'
import { useSelector } from 'react-redux'


export default function ShowRightBar () {
    const username = useSelector((state) => state.user.username)
    const follow = localStorage.getItem("Auth-Token")

    return (
        <Box height="auto" flex="1.2" width="100%" marginTop="-2%">
            <Box color="white" width="19%" height="100vh" padding="20px" pos="fixed" backgroundColor="#6333BA">
                { follow ? <Box>
                    <Box marginTop="10%" height="auto" marginBottom="10px">
                        <Textarea height="160px" type="text" backgroundColor="white" 
                        placeholder='Got something on your mind?'/>
                        <Flex justifyContent="space-between" marginTop="6px">
                            <Button colorScheme="twitter">add pic</Button>
                            <Button colorScheme="twitter">post</Button>
                        </Flex>
                    </Box>
                    <Box padding="20px" border="1px" borderColor="white">
                        <Text>Username  : {username}</Text>
                        <Text>Following : 32</Text>
                        <Text>Follower  : 76</Text>
                    </Box>
                </Box>
                : null}
                <Box padding="20px" border="1px" borderColor="white" marginTop="6em">
                    <Text>Author : Dimas</Text>
                    <Text>Email : bowotp@gmail.com</Text>
                    <Text>Company : Purwadhika&reg;</Text>
                </Box>
            </Box>
        </Box>
    );
}
